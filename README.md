# datamap

Complex node-link flow data visualization based on sigma.js.

Need chrome and local server to view the demo.

Demo data is based on real database table relations of an IT company several years ago. The data has been adjusted for safety.


features:
===

1. 30000+ nodes supported.

2. zoom and drag

3. search and highlight single node

4. search and highlight single group

![image1](https://raw.githubusercontent.com/jdk137/datamap/master/datamap.png)

![image2](https://raw.githubusercontent.com/jdk137/doubletree/master/datamap2.png)

![image3](https://raw.githubusercontent.com/jdk137/doubletree/master/datamap3.png)

data format
```javascript
{
"bu_lines":["department A","department B"], // group name
"nodes":[
  ["yunti1_hive.root.ads_cn_member_task_udt0",65.3292,35.9422,3.3027, 0], // [nodeid, x, y, radius, groupIndex]
  ["yunti1_hive.alidwicbu.idl_en_gs_customer_info_fdt0",73.27,67.0848,3.0922,1]
],
"links":[
  [0, 1] // [source node index, target node index]
]
}
```
