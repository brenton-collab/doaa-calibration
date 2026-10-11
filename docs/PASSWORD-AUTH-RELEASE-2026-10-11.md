# Password sign-in release (2026-10-11)

- PR #49 merged into main as `64ea8a822bdbacf29bacd996bacd1fc236742ba6`.
- Cloudflare build `5fbe82e4-df24-46f3-82db-41adf81a38aa` completed successfully.
- Production deployment `33ad2219-1303-4dd5-a64d-2072c1b1f0b2`, version `419ebd2f-59d5-4003-9996-a8e9c1807b9b`, at 100% traffic.
- Production D1 created `password_login_limits` table from migration 0014 using Cloudflare API. Existing historical data untouched. Migration ledger is not reconciled.
- Cloudflare Worker secrets `DOAA_PASSWORD_USERNAME` and `DOAA_PASSWORD_VERIFIER` configured. Never store plaintext password or verifier in the repository.
- Password auth is single-account for initial testing. PBKDF2-SHA256 with 260,000 iterations and random salt; per-username/IP 8 failed attempts in 15 minutes; existing D1-backed session cookie and account-scoped data. Google OAuth remains in code and on the development plan.
- Cloudflare build and deployment verified; direct live HTTP login flow not verified because this execution environment cannot resolve the workers.dev domain. User must perform the first browser sign-in test.
- Next: verify login, account preferences, bookmarks, and sign-out; add credential rotation and expand accounts only if needed; configure Google OAuth separately.
