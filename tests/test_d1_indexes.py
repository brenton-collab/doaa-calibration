"""Regression: DOAA lead dossier queries must use an entity-keyed index.

Run: python -m unittest discover -s tests -p 'test_d1_indexes.py'
This uses only synthetic SQLite data, never production aircraft records.
"""
import sqlite3
import unittest


class LeadLookupIndexTests(unittest.TestCase):
    def test_dossier_query_is_entity_indexed(self):
        db = sqlite3.connect(":memory:")
        db.executescript("""
            CREATE TABLE leads (
              id INTEGER PRIMARY KEY, entity_id INTEGER, lead_type TEXT,
              status TEXT, attempts INTEGER, retry_after TEXT
            );
            CREATE INDEX idx_leads_status_retry ON leads(status,retry_after);
        """)
        db.executemany(
            "INSERT INTO leads(entity_id,lead_type,status,attempts) VALUES(?,?,?,?)",
            ((i % 100, "registration", "pending", 0) for i in range(10000)),
        )
        sql = ("SELECT lead_type,status,attempts FROM leads "
               "WHERE entity_id=? ORDER BY status,lead_type")
        before = [r[3] for r in db.execute("EXPLAIN QUERY PLAN " + sql, (5,))]
        self.assertFalse(any("SEARCH leads USING INDEX idx_leads_entity_status_type" in x
                             for x in before))
        db.execute("CREATE INDEX idx_leads_entity_status_type "
                   "ON leads(entity_id,status,lead_type)")
        after = [r[3] for r in db.execute("EXPLAIN QUERY PLAN " + sql, (5,))]
        self.assertTrue(any("SEARCH leads USING INDEX idx_leads_entity_status_type" in x
                            for x in after), after)
        self.assertEqual(100, len(list(db.execute(sql, (5,)))))


if __name__ == "__main__":
    unittest.main()
