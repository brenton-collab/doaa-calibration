// Shared quota accounting for D1. Never authorize unverified allowance.
export function periodUTC(value = Date.now()) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) throw new TypeError('Invalid time');
  return date.toISOString().slice(0, 7);
}
export function allocation(allowance, buckets, reserveFraction = 0.2) {
  if (!Number.isSafeInteger(allowance) || allowance < 0 || reserveFraction < 0 || reserveFraction > 1) throw new TypeError('Invalid allowance');
  const ceiling = Math.floor(allowance * (1 - reserveFraction));
  if (Object.values(buckets).some(v => !Number.isSafeInteger(v) || v < 0)) throw new TypeError('Invalid bucket');
  if (Object.values(buckets).reduce((a,b)=>a+b,0)>ceiling) throw new RangeError('Oversubscribed quota');
  return { ceiling, buckets };
}
export async function admit(db, { provider, account = 'default', purpose, policy, now = Date.now() }) {
  if (!db?.prepare || !policy) throw new TypeError('Missing quota authority');
  if (![provider,account,purpose].every(v=>typeof v==='string' && /^[a-zA-Z0-9_-]{1,64}$/.test(v))) throw new TypeError('Invalid key');
  const classLimit = policy.buckets[purpose];
  if (!Number.isSafeInteger(classLimit) || classLimit === 0 || policy.ceiling === 0) return false;
  const month = periodUTC(now);
  await db.prepare("INSERT OR IGNORE INTO quota_admissions(provider,account,period,total_used,class_used_json) VALUES(?,?,?,0,'{}')").bind(provider,account,month).run();
  const key = '$.' + purpose;
  const statement = `UPDATE quota_admissions
SET total_used=total_used+1, class_used_json=json_set(class_used_json, ?, COALESCE(json_extract(class_used_json, ?),0)+1)
WHERE provider=? AND account=? AND period=? AND total_used<?
AND COALESCE(json_extract(class_used_json, ?),0)<?
AND NOT EXISTS(SELECT 1 FROM provider_state WHERE provider=? AND provider_remaining=0 AND (reset_at IS NULL OR reset_at>?))`;
  const result = await db.prepare(statement).bind(key,key,provider,account,month,policy.ceiling,key,classLimit,provider,new Date(now).toISOString()).run();
  return result?.meta?.changes === 1;
}
