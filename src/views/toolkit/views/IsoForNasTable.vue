<template>
  <div class="tool-isonas-cotainer" :style="{ padding: hideBackBtn ? '0 3px' : '' }" id="to-img-marker">
    <header class="table-header-name">清洁度:NAS1638/ISO4406</header>
    <table cellspacing="1" border="0">
      <thead>
        <tr>
          <th rowspan="2">ISO 4406</th>
          <th colspan="3">每毫升颗粒数（ISO11171）</th>
          <th rowspan="2">NAS 1638</th>
        </tr>
        <tr>
          <th>>4μm</th>
          <th>>6μm</th>
          <th>>14μm</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in tableData" :key="i" class="table-line">
          <td class="sider">{{ item.col1 }}</td>
          <td class="center">{{ item.col2 }}</td>
          <td class="center">{{ item.col3 }}</td>
          <td class="center">{{ item.col4 }}</td>
          <td class="sider">{{ item.col5 }}</td>
        </tr>
      </tbody>
    </table>

    <div style="font-size: 13px; color: #999; margin: 15px 0">
      NAS 1638污染等级是由美国航天协会提出的，按5μm-15μm，15μm-25μm，25μm-50μm，50μm-100μm和>100μm的污染物颗粒个数划分为14级。ISO 4406油液清洁度等级采用3段数码代表油液的清洁度，3段数码分别代表1mL油液中尺寸大于4μm，6μm，14μm的颗粒数，数码之间用斜线分隔。根据颗粒个数的多少共分为30个等级，颗粒数越多，代表等级的数码越大。
    </div>
  </div>
  <ShareButton />
</template>

<script>
import ShareButton from "../../../components/ShareButton/index";
export default {
  components: {
    ShareButton,
  },
  data() {
    return {
      tableData: [
        {
          col1: "23/21/18",
          col2: "80000",
          col3: "20000",
          col4: "2500",
          col5: "12",
        },
        {
          col1: "22/20/17",
          col2: "40000",
          col3: "10000",
          col4: "1300",
          col5: "11",
        },
        {
          col1: "21/19/16",
          col2: "20000",
          col3: "5000",
          col4: "640",
          col5: "10",
        },
        {
          col1: "20/18/15",
          col2: "10000",
          col3: "2500",
          col4: "320",
          col5: "9",
        },
        {
          col1: "19/17/14",
          col2: "5000",
          col3: "1300",
          col4: "160",
          col5: "8",
        },
        {
          col1: "18/16/13",
          col2: "2500",
          col3: "640",
          col4: "80",
          col5: "7",
        },
        {
          col1: "17/15/12",
          col2: "1300",
          col3: "320",
          col4: "40",
          col5: "6",
        },
        {
          col1: "16/14/11",
          col2: "640",
          col3: "160",
          col4: "20",
          col5: "5",
        },
        {
          col1: "15/13/10",
          col2: "320",
          col3: "80",
          col4: "10",
          col5: "4",
        },
        {
          col1: "14/12/09",
          col2: "160",
          col3: "40",
          col4: "5",
          col5: "3",
        },
        {
          col1: "13/11/08",
          col2: "80",
          col3: "20",
          col4: "3",
          col5: "2",
        },
        {
          col1: "12/10/07",
          col2: "40",
          col3: "10",
          col4: "1",
          col5: "1",
        },
        {
          col1: "11/09/06",
          col2: "20",
          col3: "5",
          col4: "1",
          col5: "0",
        },
        {
          col1: "10/08/05",
          col2: "10",
          col3: "3",
          col4: "0",
          col5: "00",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.tool-isonas-cotainer {
  padding: 2px;
}
.table-header-name {
  padding: 10px;
  font-size: 20px;
  color: #4d74c5;
}
table {
  width: 100%;
}
thead {
  background-color: rgba(255, 255, 0, 0.6);
}
td,
tr,
th {
  font-size: 12px;
  padding: 12px 0;
  text-align: center;
}
.sider {
  background-color: rgb(219, 219, 219);
  color: #606266;
}
.center {
  background-color: #ddebf7;
  color: #606266;
}
.table-line td {
  transition: all 0.3s ease;
}
.table-line:hover {
  td {
    background-color: #f5f7fa;
  }
}
</style>
