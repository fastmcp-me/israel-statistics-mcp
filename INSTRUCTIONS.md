
### **Instructions for Retrieving Indices Using the API**

The API provides a set of commands that can be used to retrieve the list of index topics, and another set of commands that allows for the retrieval of index data.

**Update**

**Notes - Housing Price Index**

### **General Parameters**

Parameters that can be generally added to API queries to define the format, language, number of objects per page, and so on.

| Attribute | Type | Explanation | Default | Required |
| :--- | :--- | :--- | :--- | :--- |
| **lang** | he/en | Language type (Hebrew/English) | he | --- |
| **format** | xml/json/csv/xls | Format type | Depends on the browser type, it is recommended to define the desired format | Recommended |
| **download** | true/false | Defines if the data will be downloaded as a physical file (true) or displayed in the browser (false) | Depends on the format and browser type, it is recommended to define the desired method | Recommended |
| **page** | number | Current page number (current\_page) | 1 | --- |
| **pagesize**| number | The number of objects that will appear on the page (page\_size), maximum - 1000 | 100 | --- |

---

### **Notes - Housing Price Index**

The Housing Price Index is a bi-monthly index. Therefore, the index published on the 15th of a certain month (t) is based on a comparison of transactions that took place two and three months ago (i.e., t-2 and t-3) versus transactions that took place three and four months ago (i.e., t-3 and t-4). For example, when using the calculator for a date between July 16th and August 15th, the last published index is based on transactions that took place in April-May compared to transactions that took place in March-April.

Unlike the other indices published in this series, the last three indices of the Housing Price Index are provisional and may be updated upon receipt of reports on additional transactions made in those months. Therefore, linkage to a period in which the index is still provisional is not recommended.

---

### **Table of Contents:**

* Retrieving Index Topics
* Retrieving Index Data
* Index Linkage Calculator
* Retrieving Main Indices
* Retrieving All Indices by Different Bases

---

### **Retrieving Index Topics: Full List of Topics**

#### **List of Topics by Levels**

#### **Full List of Topics**

**Template**
`https://api.cbs.gov.il/index/catalog/tree`

**Parameters**

| Attribute | Type | Explanation | Default | Required |
| :--- | :--- | :--- | :--- | :--- |
| **period** | M/Q/MQ/QM | Data update frequency (M-Monthly/Q-Quarterly/MQ-Monthly+Quarterly) | MQ | X |
| **q** | string | Text to search | --- | X |
| **string\_match\_type** | begins\_with/contains/equals | Search condition (begins with/contains/equals) | contains | X |

**Examples**

* **Retrieving index topics - name and code for each index in XML format**
    `https://api.cbs.gov.il/index/catalog/tree?format=xml&download=false`

* **Retrieving index topics and their codes for indices containing specific text `[q=Industry]`**
    `https://api.cbs.gov.il/index/catalog/tree?format=json&download=false&q=`

* **Retrieving index topics that are updated on a monthly basis**
    `https://api.cbs.gov.il/index/catalog/tree?format=xml&download=false&period=M`

---

### **List of Topics by Levels: List of Chapters**

#### **List of Topics by Chapter**

#### **List of Codes by Topic**

#### **List of Chapters**

**Template**
`https://api.cbs.gov.il/index/catalog/catalog`

**Examples**

* **Retrieving the list of chapters of the price indices**
    `https://api.cbs.gov.il/index/catalog/catalog?format=xml&download=false`

#### **List of Topics by Chapter**

**Template**
`https://api.cbs.gov.il/index/catalog/chapter`

**Parameters**

| Attribute | Type | Explanation | Default | Required |
| :--- | :--- | :--- | :--- | :--- |
| **id** | string | The chapter code | --- | V |

**Examples**

* **Retrieving topics of a specific chapter from the price indices**
    `https://api.cbs.gov.il/index/catalog/chapter?id=a&format=xml&download=false`

#### **List of Codes by Topic**

**Template**
`https://api.cbs.gov.il/index/catalog/subject`

**Parameters**

| Attribute | Type | Explanation | Default | Required |
| :--- | :--- | :--- | :--- | :--- |
| **id** | number | The topic number | --- | V |
| **q** | string | Text to search | --- | X |
| **string\_match\_type** | begins\_with/contains/equals | Search condition (begins with/contains/equals) | contains | X |

**Examples**

* **Retrieving the codes of the index series by a specific topic**
    `https://api.cbs.gov.il/index/catalog/subject?id=37&format=xml&download=false`
* **Retrieving the codes of the index series by a specific topic and a description that contains specific text `[q=Fruits]`**
    `https://api.cbs.gov.il/index/catalog/subject?id=37&format=xml&download=false&q=`

---

### **Retrieving Index Data**

**Template**
`https://api.cbs.gov.il/index/data/price`

**Parameters**

| Attribute | Type | Explanation | Default | Required |
| :--- | :--- | :--- | :--- | :--- |
| **id** | number | The index code | --- | V |
| **startPeriod** | mm-yyyy | From date | 01-1900 | X |
| **endPeriod** | mm-yyyy | To date | 01-2100 | X |
| **last** | number>0 | Number of objects to retrieve from the series, starting from the most updated values onward | All | X |
| **coef** | true/false| Add coefficient | false | X |

**Examples**

* **Retrieving data for a specific index by the index code**
    `https://api.cbs.gov.il/index/data/price?id=120010&format=xml&download=false`
* **Retrieving data for a specific index for specific dates**
    `https://api.cbs.gov.il/index/data/price?id=120010&format=xml&download=false&startPeriod=01-2000&endPeriod=12-2019`
* **Retrieving the last values of a specific index including linkage coefficients**
    `https://api.cbs.gov.il/index/data/price?id=120010&format=xml&download=false&last=2&coef=true`

---

### **Index Linkage Calculator**

**Template**
`https://api.cbs.gov.il/index/data/calculator/{id}`

**Parameters**

| Attribute | Type | Explanation | Default | Required |
| :--- | :--- | :--- | :--- | :--- |
| **id** | number | The index code | --- | V |
| **value** | number>0 | The linkage amount | --- | V |
| **date** | mm-dd-yyyy/yyyy-mm-dd | From date | --- | V |
| **toDate** | mm-dd-yyyy/yyyy-mm-dd | To date | --- | V |
| **currency** | new\_sheqel/old\_sheqel/lira | Currency type | new\_sheqel | X |

**Examples**

* **Index calculation**
    `https://api.cbs.gov.il/index/data/calculator/120010?value=100&date=01-01-2018&toDate=01-01-2019&format=xml&download=false`
* **Index calculation by Lira values**
    `https://api.cbs.gov.il/index/data/calculator/120010?value=100&date=01-01-2000&toDate=12-01-2019¤cy=lira&format=xml&download=false`

---

### **Retrieving Main Indices: Retrieving Main Indices by Different Bases**

#### **Retrieving Main Indices**

#### **Retrieving Main Indices by Periods**

#### **Retrieving Main Indices by Different Bases**

**Template**
`https://api.cbs.gov.il/index/data/price_selected`

**Parameters**

| Attribute | Type | Explanation | Default | Required |
| :--- | :--- | :--- | :--- | :--- |
| **oldformat\***| true/false | Corrections for adapting to the old format, mainly concerning Hebrew, spaces, display order in base | false | X |

**Update**

**Examples\***

* **Retrieving the main indices on different bases**
    `https://api.cbs.gov.il/index/data/price_selected?oldformat=true&format=xml&download=false`
* **Retrieving the main indices on different bases in the old format**
    `https://api.cbs.gov.il/index/data/price_selected?oldformat=true&format=xml&download=false`

Currently, support is for XML format only.
Default: `oldformat=false&format=xml&download=false`

#### **Retrieving Main Indices**

**Template**
`https://api.cbs.gov.il/index/data/price_selected_b`

**Example\***

* **Retrieving the main indices**
    `https://api.cbs.gov.il/index/data/price_selected_b`

Currently, support is for XML format only.

#### **Retrieving Main Indices by Periods**

**Template**
`https://api.cbs.gov.il/index/data/price_selected_b`

**Parameters**

| Attribute | Type | Explanation | Default | Required |
| :--- | :--- | :--- | :--- | :--- |
| **StartDate** | yyyymm | From date | 199701 (minimum) | V |
| **EndDate** | yyyymm | To date | --- | V |

**Example\***

* **Retrieving the main indices from 01/1997 to 03/2021**
    `https://api.cbs.gov.il/index/data/price_selected_b?StartDate=199701&EndDate=202103`

Currently, support is for XML format only.

---

### **Retrieving All Indices by Different Bases**

**Template**
`https://api.cbs.gov.il/index/data/price_all`

**Parameters**

| Attribute | Type | Explanation | Default | Required |
| :--- | :--- | :--- | :--- | :--- |
| **oldformat** | true/false | Corrections for adapting to the old format, mainly concerning Hebrew, spaces, display order in base | false | X |
| **chapter** | string | Can filter by a specific chapter. The list of chapters can be found at: `https://api.cbs.gov.il/Index/Catalog/Catalog` `chapter=chapter_id` | "" (All chapters) | X |

**Chapter\*** | **Description**
:--- | :---
a | Consumer Price Index
aa | Index and average prices from the housing market
b | Producer Price Index - Industrial Output for Domestic Destinations
ba | Producer Price Index - Exports in Industry, Mining and Quarrying
bb | Producer Price Index - Service Industries
c | Price Index of Input in Residential Building
ca | Price Index of Input in Commercial and Office Building
d | Price Index of Input in Road Construction and Bridging
e | Price Index of Input in Agriculture
f | Price Index of Input in Buses
fa | Price Index of Input in Public Minibuses

**Examples\***

* **Retrieving the indices on different bases**
    `https://api.cbs.gov.il/index/data/price_all?format=xml&download=false`
* **Retrieving the indices on different bases in English**
    `https://api.cbs.gov.il/index/data/price_all?lang=en&format=xml&download=false`
* **Retrieving the indices on different bases in the old format**
    `https://api.cbs.gov.il/index/data/price_all?format=xml&download=false&oldformat=true`
* **Retrieving the indices on different bases for chapter a (Consumer Price Index)**
    `https://api.cbs.gov.il/index/data/price_all?chapter=a`

Currently, support is for XML format only.
Default: `format=xml&download=false&chapter=&oldformat=false`