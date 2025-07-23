1. get_index_calculator identified is the schema validation error in the index calculator responses due to null values in some fields.

failed:

```json
{
  "indexCode": 110050,
  "value": 1000,
  "fromDate": "01-01-2020",
  "toDate": "06-01-2025",
  "currency": "new_sheqel",
  "lang": "en",
  "explanation": "Calculate food price inflation including vegetables and fruit"
}
```

```json
[
  {
    "code": "invalid_type",
    "expected": "number",
    "received": "null",
    "path": ["answer", "mult_min"],
    "message": "Expected number, received null"
  },
  {
    "code": "invalid_type",
    "expected": "number",
    "received": "null",
    "path": ["answer", "mult_max"],
    "message": "Expected number, received null"
  }
]
```

success:

```json
{
  "indexCode": 120010,
  "value": 1000,
  "fromDate": "01-01-2020",
  "toDate": "06-01-2025",
  "currency": "new_sheqel",
  "lang": "en",
  "explanation": "Calculate how much 1000 NIS from 2020 is worth today using general CPI"
}
```
