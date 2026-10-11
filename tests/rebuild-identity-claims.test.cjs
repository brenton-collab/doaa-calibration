const test=require('node:test');
const assert=require('node:assert/strict');
const {field}=require('../flight-core.js');
const claim=(value,status='supported',extra={})=>({predicate:'registration',value_text:value,status,...extra});

test('one supported identity claim takes precedence over fallback',()=>{
 const result=field({claims:[claim('C-ABCD')]},'registration','C-FALLBACK');
 assert.equal(result.state,'supported');
 assert.equal(result.value,'C-ABCD');
});

test('distinct supported registrations remain conflicting even across sequential dates',()=>{
 const result=field({claims:[
  claim('C-OLD','supported',{effective_from:'2018-01-01T00:00:00Z',effective_to:'2020-01-01T00:00:00Z'}),
  claim('C-NEW','supported',{effective_from:'2020-01-01T00:00:00Z'})
 ]},'registration');
 assert.equal(result.state,'conflicting');
 assert.equal(result.value,'CONFLICTING');
 assert.equal(result.claims.length,2);
});

test('overlapping differing claims remain conflicting',()=>{
 const result=field({claims:[claim('C-ONE'),claim('C-TWO')]},'registration');
 assert.equal(result.state,'conflicting');
});

test('superseded registration does not override active claim',()=>{
 const result=field({claims:[claim('C-OLD','superseded'),claim('C-NEW')]},'registration');
 assert.equal(result.state,'supported');
 assert.equal(result.value,'C-NEW');
});

test('missing effective dates cannot establish a chronological winner',()=>{
 const result=field({claims:[claim('C-ONE'),claim('C-TWO')]},'registration','C-FALLBACK');
 assert.equal(result.state,'conflicting');
});

test('explicit conflicting status is not hidden by a single value',()=>{
 const result=field({claims:[claim('C-ONE','conflicting')]},'registration');
 assert.equal(result.state,'conflicting');
});

test('reported fallback is distinct from inferred identity',()=>{
 const dossier={claims:[claim('C-INFERRED','inferred')]};
 assert.equal(field(dossier,'registration','C-REPORTED').state,'reported');
 assert.equal(field(dossier,'registration').state,'inferred');
});

test('unknown identity stays unknown',()=>{
 assert.equal(field({claims:[]},'registration').state,'unknown');
});

test('multiple differing inferred values cannot silently select first claim',()=>{
 const result=field({claims:[claim('C-INFERRED-A','inferred'),claim('C-INFERRED-B','inferred')]},'registration');
 assert.equal(result.state,'conflicting');
 assert.equal(result.value,'CONFLICTING');
});

test('duplicate inferred values remain visibly inferred',()=>{
 const result=field({claims:[claim('C-SAME','inferred'),claim('C-SAME','inferred')]},'registration');
 assert.equal(result.state,'inferred');
 assert.equal(result.value,'C-SAME · INFERRED');
});

test('supported identity is not replaced by inferred disagreement',()=>{
 const result=field({claims:[claim('C-SUPPORTED'),claim('C-INFERRED','inferred')]},'registration');
 assert.equal(result.state,'supported');
 assert.equal(result.value,'C-SUPPORTED');
});

test('multiple inferred disagreements remain conflicting without fallback',()=>{
 const result=field({claims:[claim('C-A','inferred'),claim('C-B','inferred')]},'registration');
 assert.equal(result.state,'conflicting');
 assert.equal(result.claims.length,2);
});
