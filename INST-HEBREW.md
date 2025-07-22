הנחיות למשיכת מדדים באמצעות ממשק ה-API
ה-API מספק סט פקודות שבאמצעותו ניתן למשוך את רשימת הנושאים של המדדים, וסט פקודות נוסף שמאפשר משיכה של נתוני המדדים.

עדכון

הערות - מדד מחירי הדירות ​

פרמטרים כלליים

פרמטרים שניתן להוסיף באופן כללי לשאילתות ה-API לצורך הגדרת הפורמט, השפה, מספר אובייקטים בדף וכדומה.

 

מאפיין	סוג	הסבר	ברירת מחדל	פרמטר חובה
lang	he/en	סוג שפה (עברית/אנגלית)	he	---
format	xml/json/csv/xls	סוג פורמט	תלוי בסוג הדפדפן, מומלץ להגדיר את הפורמט הרצוי	רצוי
download
true/false	מגדיר אם הנתונים ירדו כקובץ פיזי (true) או יוצגו בדפדפן (false)	תלוי בפורמט ובסוג הדפדפן, מומלץ להגדיר את האופן הרצוי	רצוי
page	number	מספר דף נוכחי (current_page)	1	---
pagesize
number	כמות האובייקטים שיופיעו בדף (page_size), מקסימום - 1000	100	---



הערות - מדד מחירי הדירות 

1. מדד מחירי הדירות הוא מדד דו-חודשי. לפיכך, המדד שפורסם ב-15 בחודש מסוים (t) מתבסס על השוואת עסקאות שבוצעו לפני חודשיים ולפני שלושה חודשים (כלומר t-2 ו-t-3) לעומת עסקאות שבוצעו לפני שלושה וארבעה חודשים (כלומר t-3 ו-t-4). לדוגמה, בשימוש במחשבון עבור מועד בין ה-16 ביולי ל-15 באוגוסט, המדד האחרון שפורסם מתבסס על עסקאות שבוצעו בחודשים אפריל-מאי לעומת עסקאות שבוצעו בחודשים מרץ-אפריל.

2.  בניגוד למדדים האחרים המתפרסמים בסדרה זו, שלושת המדדים האחרונים של מדד מחירי הדירות הם ארעיים ועשויים להתעדכן עם קבלת דיווח על עסקאות נוספות שנעשו באותם חודשים. אי לכך, הצמדה לתקופה שבה המדד עדיין ארעי אינה מומלצת.

תוכן עניינים:

משיכת נושאי המדדים

משיכת נתוני המדדים

מחשבון הצמדה למדד

משיכת מדדים עיקריים

משיכת כל המדדים לפי בסיסים שונים

משיכת נושאי המדדים:
רשימת הנושאים המלאה

רשימת הנושאים לפי לרמות

רשימת הנושאים המלאה
תבנית

https://api.cbs.gov.il/index/catalog/tree

פרמטרים

מאפיין	סוג	הסבר	ברירת מחדל	פרמטר חובה
period	M/Q/MQ/QM	תדירות עדכון הנתונים (M-חודשי/Q-רבעוני/MQ-חודשי+רבעוני)	MQ	X
q	string	טקסט לחיפוש	---	X
string_match_type	begins_with/contains/equals	תנאי החיפוש (מתחיל עם/מכיל/שווה)	contains	X
דוגמאות

משיכת נושאי המדדים - שם וקוד עבור כל מדד בפורמט XML	
https://api.cbs.gov.il/index/catalog/tree?format=xml&download=false

 

משיכת נושאי המדדים והקודים שלהם עבור מדדים המכילים מלל מסוים	
תעשייה=https://api.cbs.gov.il/index/catalog/tree?format=json&download=false&q

 

משיכת נושאי המדדים המתעדכנים ברמה החודשית	
https://api.cbs.gov.il/index/catalog/tree?format=xml&download=false&period=M

 

רשימת הנושאים לפי לרמות:
רשימת פרקים

רשימת נושאים לפי פרק

רשימת קודים לפי נושא

רשימת פרקים
תבנית

https://api.cbs.gov.il/index/catalog/catalog

דוגמאות

משיכת רשימת הפרקים של מדדי המחירים	
https://api.cbs.gov.il/index/catalog/catalog?format=xml&download=false

 

רשימת נושאים לפי פרק
תבנית

https://api.cbs.gov.il/index/catalog/chapter

פרמטרים

מאפיין	סוג	הסבר	ברירת מחדל	פרמטר חובה
id	string	קוד הפרק	---	V
דוגמאות

משיכת נושאים של פרק מסוים ממדדי המחירים	
https://api.cbs.gov.il/index/catalog/chapter?id=a&format=xml&download=false

 

רשימת קודים לפי נושא
תבנית

https://api.cbs.gov.il/index/catalog/subject

פרמטרים

מאפיין	סוג	הסבר	ברירת מחדל	פרמטר חובה
id	number	מספר הנושא	---	V
q	string	טקסט לחיפוש	---	X
string_match_type	begins_with/contains/equals	תנאי החיפוש (מתחיל עם/מכיל/שווה)	contains	X
דוגמאות

משיכת הקודים של סדרות המדדים לפי נושא מסוים	
https://api.cbs.gov.il/index/catalog/subject?id=37&format=xml&download=false

 

משיכת הקודים של סדרות המדדים לפי נושא ספציפי ותיאור שמכיל מלל מסוים	
פירות=https://api.cbs.gov.il/index/catalog/subject?id=37&format=xml&download=false&q

 

משיכת נתוני המדדים
תבנית

https://api.cbs.gov.il/index/data/price

פרמטרים

מאפיין	סוג	הסבר	ברירת מחדל	פרמטר חובה
id	number	קוד המדד	---	V
startPeriod	mm-yyyy	מתאריך	01-1900	X
endPeriod	mm-yyyy	עד תאריך	01-2100	X
last	number>0	מספר האובייקטים למשיכה מהסדרה/ות החל מהערכים הכי מעודכנים והלאה	הכל	X
coef	true/false	הוספת מקדם	false	X
דוגמאות

משיכת נתוני מדד מסוים לפי קוד המדד	
https://api.cbs.gov.il/index/data/price?id=120010&format=xml&download=false

 

משיכת נתוני מדד מסוים בתאריכים מסוימים	
https://api.cbs.gov.il/index/data/price?id=120010&format=xml&download=false&startPeriod=01-2000&endPeriod=12-2019

 

משיכת הערכים האחרונים של מדד מסוים כולל מקדמי קשר	
https://api.cbs.gov.il/index/data/price?id=120010&format=xml&download=false&last=2&coef=true

 

מחשבון הצמדה למדד
תבנית

https://api.cbs.gov.il/index/data/calculator/{id}

פרמטרים

מאפיין	סוג	הסבר	ברירת מחדל	פרמטר חובה
id	number	קוד המדד	---	V
value	number>0	סכום ההצמדה	---	V
date	mm-dd-yyyy/yyyy-mm-dd	מתאריך	---	V
toDate	mm-dd-yyyy/yyyy-mm-dd	עד תאריך	---	V
currency	new_sheqel/old_sheqel/lira	סוג מטבע	new_sheqel	X
דוגמאות

חישוב מדד	
https://api.cbs.gov.il/index/data/calculator/120010?value=100&date=01-01-2018&toDate=01-01-2019&format=xml&download=false

 

חישוב מדד לפי ערכי לירה	
https://api.cbs.gov.il/index/data/calculator/120010?value=100&date=01-01-2000&toDate=12-01-2019¤cy=lira&format=xml&download=false

 

משיכת מדדים עיקריים:
משיכת מדדים עיקריים לפי בסיסים שונים

משיכת מדדים עיקריים

משיכת מדדים עיקריים לפי תקופות


משיכת מדדים עיקריים לפי בסיסים שונים
תבנית

https://api.cbs.gov.il/index/data/price_selected

פרמטרים

מאפיין	סוג	הסבר	ברירת מחדל	פרמטר חובה
oldformat*
true/false
תיקונים להתאמה לפורמט הישן בעיקר בנוגע לעברית , רווחים , סדר הצגה ב base 
false
X


* עדכון

דוגמאות*

משיכת המדדים העיקריים בבסיסים שונים	
https://api.cbs.gov.il/index/data/price_selected?oldformat=true&format=xml&download=false

משיכת המדדים העיקריים בבסיסים שונים בפורמט הישן	
https://api.cbs.gov.il/index/data/price_selected?oldformat=true&format=xml&download=false

 * כרגע התמיכה היא בפורמט XML בלבד ,

ברירת מחדל oldformat=false&format=xml&download=false



משיכת מדדים עיקריים
תבנית

https://api.cbs.gov.il/index/data/price_selected_b

דוגמא*

משיכת המדדים העיקריים
https://api.cbs.gov.il/index/data/price_selected_b
 * כרגע התמיכה היא בפורמט XML בלבד.

משיכת מדדים עיקריים לפי תקופות
תבנית


https://api.cbs.gov.il/index/data/price_selected_b

פרמטרים


מאפיין	סוג	הסבר	ברירת מחדל	פרמטר חובה
StartDate	yyyymm
מתאריך	
199701
(מינימום)
V
EndDate	yyyymm
עד תאריך	---
V


דוגמא*

משיכת המדדים העיקריים
מ-01/1997 עד- 03/2021 
https://api.cbs.gov.il/index/data/price_selected_b?StartDate=199701&EndDate=202103
 * כרגע התמיכה היא בפורמט XML בלבד.

משיכת כל המדדים לפי בסיסים שונים
תבנית

https://api.cbs.gov.il/index/data/price_all

פרמטרים

מאפיין	סוג	הסבר	ברירת מחדל	פרמטר חובה
oldformat	true/false	תיקונים להתאמה לפורמט הישן בעיקר בנוגע לעברית , רווחים , סדר הצגה ב base	false	X
chapter	string	
ניתן לסנן לפי פרק מסוים

את רשימת הפרקים ניתן למצוא ב:

https://api.cbs.gov.il/Index/Catalog/Catalog

chapter=chaptereid  *

פרק*	תיאור
a	מדד המחירים לצרכן
aa	מדד ומחירים ממוצעים משוק הדירות
b	מדד מחירי יצרן - תפוקת התעשייה ליעדים מקומיים
ba	מדד מחירי יצרן - יצוא בענפי התעשייה, כרייה וחציבה
bb	מדד מחירי יצרן - ענפי השירותים
c	מדד מחירי תשומה בבנייה למגורים
ca	מדד מחירי תשומה בבנייה למסחר ולמשרדים
d	מדד מחירי תשומה בסלילה וגישור
e	מדד מחירי תשומה בחקלאות
f	מדד מחירי תשומה באוטובוסים
fa	מדד מחירי תשומה באוטובוסים זעירים ציבוריים
""

כל הפרקים

X


דוגמאות*

משיכת המדדים בבסיסים השונים 
https://api.cbs.gov.il/index/data/price_all?format=xml&download=false

משיכת המדדים בבסיסים השונים באנגלית	
https://api.cbs.gov.il/index/data/price_all?lang=en&format=xml&download=false

 משיכת המדדים בבסיסים השונים בפורמט הישן
 https://api.cbs.gov.il/index/data/price_all?format=xml&download=false&oldformat=true

 משיכת המדדים בבסיסים השונים עבור פרק a

מדד המחירים לצרכן

 https://api.cbs.gov.il/index/data/price_all?chapter=a

 * כרגע התמיכה היא בפורמט XML בלבד

ברירת מחדל format=xml&download=false&chapter=&oldformat=false