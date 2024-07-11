<template>
  <div id="to-img-marker">
    <div class="section-title">基本信息</div>
    <div class="section-input">
      <!-- 轴承负荷方向 -->
      <van-field :border="false" v-model="baseInfo.bearDirection" input-align="right" maxlength="50" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px; cursor: pointer"> 轴承负荷方向 </span>
        </template>
        <template #right-icon>
          <div style="display: flex; cursor: pointer; color: #c8c9cc" @click="openBearDirectionPopup">
            {{ bearDirectionName ? bearDirectionName : "请选择" }}
            <van-icon name="arrow" />
          </div>
        </template>
      </van-field>
      <!-- 轴承类型 -->
      <van-field :border="false" v-model="baseInfo.bearType" input-align="right" maxlength="50" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px; cursor: pointer"> 轴承类型 </span>
        </template>
        <template #right-icon>
          <div style="display: flex; cursor: pointer; color: #c8c9cc" @click="openBearingTypePopup">
            {{ bearTypeName ? bearTypeName : "请选择" }}
            <van-icon name="arrow" />
          </div>
        </template>
      </van-field>
      <!-- 常数C -->
      <van-field :border="false" input-align="right" v-model="baseInfo.C" placeholder="请选择轴承类型" disabled>
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px; cursor: pointer"> 常数C </span>
        </template>
      </van-field>
      <!-- 复合表面粗糙度𝜎（𝜇m） -->
      <van-field :border="false" input-align="right" v-model="baseInfo.roughness" placeholder="请选择轴承类型" disabled>
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px; cursor: pointer"> 复合表面粗糙度𝜎（𝜇m）</span>
        </template>
      </van-field>

      <div class="section-title">轴承信息</div>
      <!-- 轴承转速N（rpm） -->
      <van-field :border="false" v-model="bearingInfo.N" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off" @blur="speedBlur">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">轴承转速N（rpm）</span>
        </template>
      </van-field>
      <!-- 轴承内径d（m） -->
      <van-field :border="false" v-model="bearingInfo.d" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off" @blur="commonInputNumBlur('d')">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">轴承内径d（m）</span>
        </template>
      </van-field>
      <!-- 轴承外径D（m） -->
      <van-field :border="false" v-model="bearingInfo.D" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off"  @blur="commonInputNumBlur('D')">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">轴承外径D（m）</span>
        </template>
      </van-field>
      <!-- 滚动体半径𝑅𝑅（m） -->
      <van-field :border="false" v-model="bearingInfo.RR" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off" v-if="checkBearDirection==2"  @blur="commonInputNumBlur('RR')">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">滚动体半径𝑅𝑅（m）</span>
        </template>
      </van-field>
      <!-- 目标膜厚比 λ -->
      <van-field :border="false" v-model="bearingInfo.λ" input-align="right" maxlength="50" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px; cursor: pointer"> 目标膜厚比 λ 
            <span style="cursor: pointer" @click="alertTip('λ')"><van-icon name="warning" /></span>
          </span>
        </template>
        <template #right-icon>
          <div style="display: flex; cursor: pointer; color: #c8c9cc" @click="openTargetPopup">
            {{ checkedTargetFilmName ? checkedTargetFilmName : "请选择" }}
            <van-icon name="arrow" />
          </div>
        </template>
      </van-field>
      <!-- 轴承工作温度T（°C） -->
      <van-field :border="false" v-model="bearingInfo.T" placeholder="请输入5的倍数" input-align="right" maxlength="50" autocomplete="off" @blur="temperatureBlur">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px;position: relative; z-index: 99">轴承工作温度T（°C）
            <span style="cursor: pointer" @click="alertTip('T')"><van-icon name="warning" /></span>
          </span>
        </template>
      </van-field>
      <!-- 润滑剂参数LP -->
      <van-field :border="false" input-align="right" disabled>
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px; cursor: pointer"> 润滑剂参数LP </span>
        </template>
        <template #right-icon>
          <span :style="{ color:isChangePlaceholderFlag ? '#d10000' : '#646566' }" v-html="toolkit_count_empty_value_LP(bearingInfo.LP,isChangePlaceholderFlag)" />
        </template>
      </van-field>

    </div>

    <div class="section-title">产品推荐</div>
    <div style="padding: 0 12px 12px;font-size: 12px;background-color: #f2f2f2;color:#001450">下述产品由输入参数计算的LP值近似推荐，仅供参考；超过工作温度（0-140°C）的情况，请结合实际工况综合考虑后推荐。</div>
    <!-- 产品1 -->
    <van-field :border="false" label-width="50px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block;">产品1</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_count_empty_value(production.one,isChangePlaceholderFlag)" />
      </template>
    </van-field>
    <!-- 产品2 -->
    <van-field :border="false" label-width="50px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block;">产品2</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_count_empty_value(production.two,isChangePlaceholderFlag)" />
      </template>
    </van-field>
    <!-- 产品3 -->
    <van-field :border="false" label-width="50px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block;">产品3</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_count_empty_value(production.three,isChangePlaceholderFlag)" />
      </template>
    </van-field>
  </div>
  <ShareButton />
  <div id="selPppup"></div>
</template>

<script>
import ShareButton from "../../../components/ShareButton/index";
import CopyButton from "../../../components/CopyButton/index.vue";
import { showPopup } from "../../../components/Popup/index";
import { Dialog, ImagePreview, Toast } from "vant"
import { bearDirectionList, bearTypeList, targetFilmList,productionList } from "../components/RecommendedLupGrease/config"
export default {
  mixins:[],
  components: { ShareButton, CopyButton, showPopup },
  data(){
    return{
      baseInfo:{
        bearDirection:'',
        bearType:'',
        C:'',
        roughness:'',
      },
      bearingInfo:{
        N:'',
        d:'',
        D:'',
        RR:'',
        λ:'',
        T:'',
        LP:'',
      },
      production:{
        one:'',
        two:'',
        three:''
      },
      bearDirectionName:'',
      checkBearDirection:'',
      bearTypeName:'',
      checkedBearType:'',
      checkedTargetFilmName:'',
      checkedTargetFilmVal:'',
      isChangePlaceholderFlag:false,
      commonNumList:[]
    }
  },
  created(){
    
  },
  methods:{
    alertTip(type){
      let msg = ''
      switch (type) {
        case 'λ':
          msg = 'λ=1.5，最低的膜厚比，很高的能效 λ=2.5，较大的油膜厚度，在冲击或重负荷下有较好的保护，较低的能效'
        break;
        case 'T':
          msg = `经验法则：
轴承工作温度=轴承座外表温度+15°C`
        break;
        default:
          break
      }
      Dialog.alert({
        title: "填写提示",
        "message-align": "left",
        message: msg,
        confirmButtonText: "我知道了",
      });
    },
    // 轴承负荷方向
    openBearDirectionPopup(){
      showPopup(bearDirectionList, this.checkBearDirection, "选择轴承负荷方向", (e) => {
        this.bearDirectionName = e.name
        this.checkBearDirection = e.value
        if(e.value != 2){
          this.bearingInfo.RR = ''
        }
        this.bearTypeName = ''
        this.checkedBearType = ''
        this.baseInfo.C = ''
        this.baseInfo.roughness = ''
        this.bearingInfo.LP = ''
        this.production.one = ''
        this.production.two = ''
        this.production.three = ''
      });
    },
    // 轴承类型
    openBearingTypePopup(){
      if(!this.checkBearDirection){
        Toast('请先选择轴承负荷方向')
      }else{
        const list = bearTypeList.filter(it=>{
          return it.type ==this.checkBearDirection
        })
        showPopup(list, this.checkedBearType, "选择轴承类型", (e) => {
          this.bearTypeName = e.name
          this.checkedBearType = e.value
          this.baseInfo.C = e.C
          this.baseInfo.roughness = e.roughness
          this.countLPNumber()
        });
      }
    },
    openTargetPopup(){
      showPopup(targetFilmList, this.checkedTargetFilmVal, "选择目标膜厚比", (e) => {
        this.checkedTargetFilmName= e.name
        this.checkedTargetFilmVal = e.value
        this.countLPNumber()
      });
    },
    speedBlur(){
      const val = this.bearingInfo.N
      this.bearingInfo.N = this.handleInputBlur(val,999999,2)
      this.countLPNumber()
    },
    commonInputNumBlur(type){
      const val = this.bearingInfo[type]
      this.bearingInfo[type] = this.handleInputBlur(val,9,3)
      const flag = this.validateItem(type,this.bearingInfo[type])
      console.log('flag....',flag)
      if(flag){
        this.countLPNumber()
      }
    },
    validateItem(type,value){
      let flag = false
      // type:d:内径；D：外径；RR：滚动体半径
      // D>d>RR
      if(type == "d"){
        if(this.bearingInfo['D']){
          if(this.checkBearDirection==2){
            if(this.bearingInfo['RR']){
              if(value<this.bearingInfo['D'] && value>this.bearingInfo['RR']){
                flag = true
              }else{
                Toast('请重新输入')
                this.bearingInfo['d'] = ''
              }
            }else{
              if(value<this.bearingInfo['D']){
                flag = true
              }else{
                Toast('请重新输入')
                this.bearingInfo['d'] = ''
              }
            }
          }else{
            if(value<this.bearingInfo['D']){
              flag = true
            }else{
              Toast('请重新输入')
              this.bearingInfo['d'] = ''
            }
          }
        }else{
          if(this.checkBearDirection==2){
            if(this.bearingInfo['RR']){
              if(value>this.bearingInfo['RR']){
                flag = true
              }else{
                Toast('请重新输入')
                this.bearingInfo['d'] = ''
              }
            }
          }
        }
      }else if(type == "D"){
        if(this.bearingInfo['d']){
          if(this.checkBearDirection==2){
            if(this.bearingInfo['RR']){
              if(value>this.bearingInfo['d'] && value>this.bearingInfo['RR']){
                flag = true
              }else{
                Toast('请重新输入')
                this.bearingInfo['D'] = ''
              }
            }else{
              if(value>this.bearingInfo['d']){
                flag = true
              }else{
                Toast('请重新输入')
                this.bearingInfo['D'] = ''
              }
            }
          }else{
            if(value>this.bearingInfo['d']){
              flag = true
            }else{
              Toast('请重新输入')
              this.bearingInfo['D'] = ''
            }
          }
        }else{
          if(this.checkBearDirection==2){
            if(this.bearingInfo['RR']){
              if(value>this.bearingInfo['RR']){
                flag = true
              }else{
                Toast('请重新输入')
                this.bearingInfo['D'] = ''
              }
            }
          }
        }
      }else if(type == "RR"){
        if(this.bearingInfo['d'] || this.bearingInfo['D']){
          if(this.bearingInfo['d']){
            if(value<this.bearingInfo['d']){
              flag = true
            }else{
              Toast('请重新输入')
              this.bearingInfo['RR'] = ''
            }
          }
          if(this.bearingInfo['D']){
            if(value<this.bearingInfo['D']){
              flag = true
            }else{
              Toast('请重新输入')
              this.bearingInfo['RR'] = ''
            }
          }
        }
      }
      return flag
    },
    handleInputBlur(val,maxNumber,decimalNumber){
      let result = ''
      val = val.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
      val = val.replace(/^\./g, '') // 验证第一个字符是数字而不是.
      val = val.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的.
      val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.') // 只允许输入一个小数点
      val = val.replace(/(\d+|\.)-/g, '$1') // 数字和.后面不能接-,不能出现类似11-, 12.-
      val = val.replace(/^0+(\d)/, '$1') // 第一位0开头，0后面为数字，则过滤掉，取后面的数字
      let msg = `请输入0-${maxNumber}内的正数`
      if(val==0){
        Toast(msg)
        result = ''
        return
      }
      if(val.indexOf('.')>0){//小数
        if(val<0){
          Toast(msg)
          result = ''
        }else{
          if(val>maxNumber){
            Toast(msg)
            result = maxNumber
          }else{
            let pointList = val.split('.')
            let pointList1 = pointList[1]
            if(!pointList1){
              result = pointList[0]
            }else{
              if(pointList1.length>decimalNumber){
                pointList[1] = pointList[1].substr(0, decimalNumber)
                result = parseFloat(pointList.join("."));
              }else{
                result = parseFloat(pointList.join("."));
              }
            }
          }
        }
      }else{//整数
        if(val<0){
          Toast(msg)
          result = ''
        }else{
          if(val>maxNumber){
            Toast(msg)
            result = maxNumber
          }else{
            result = val
          }
        }
      }
      return result
    },
    temperatureBlur(){
      let val = this.bearingInfo.T
      let result = ''
      val = val.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
      val = val.replace(/^\./g, '') // 验证第一个字符是数字而不是.
      val = val.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的.
      val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.') // 只允许输入一个小数点
      if(val){//数字
        if(val>=0 && val<=140){
          if(val%5 != 0) {//不是5的倍数
            result = Math.ceil(val/5)*5
          }else{
            result = val
          }
        }else{
          Toast('请输入0-140的整数')
          if(val>140){
            result = 140
          }else if(val<0){
            result = 0
          }
        }
      }else{
        Toast('请输入0-140的整数')
        if(val<0){
          result = 0
        }
      }
      this.bearingInfo.T = result
      this.countLPNumber()
    },
    countLPNumber(){
      if(this.baseInfo.C != '' && this.baseInfo.roughness != '' && this.bearingInfo.N != '' && this.bearingInfo.d != '' && this.bearingInfo.D != '' && this.checkedTargetFilmName != ''){
        if(this.checkBearDirection==2){
          if(this.bearingInfo.RR != ''){
            this.handlerCount()
          }
        }else{
          this.handlerCount()
        }
      }else{
        this.bearingInfo.LP = ''
        this.production.one = ''
        this.production.two = ''
        this.production.three = ''
        this.isChangePlaceholderFlag = false
      }
    },
    handlerCount(){
      const C = Number(this.baseInfo.C)
      const R = Number(this.baseInfo.roughness)
      const N = Number(this.bearingInfo.N)
      const d = Number(this.bearingInfo.d)
      const D = Number(this.bearingInfo.D)
      const λ = Number(this.checkedTargetFilmName)
      const T = Number(this.bearingInfo.T)
      const RR = Number(this.bearingInfo.RR)
      let LPRB = ''
      this.bearingInfo.LP = ''
      this.production.one = ''
      this.production.two = ''
      this.production.three = ''
      this.isChangePlaceholderFlag = false
      if(this.checkBearDirection==2){//推力轴承
          LPRB = ((1793/(N*((d+D)/4)))*(((λ*R)/(RR**0.26))**1.35)).toFixed(7)
        }else{//径向轴承
          LPRB = ((1/N)*(((λ*R)/(C*D))**1.35)).toFixed(8)
        }
      LPRB = Number(LPRB)
      console.log('LPRB.....',LPRB)
      if(!LPRB)return
      let lp = this.countCTvalAndLP(LPRB,N,D,d)
      console.log('isNaN(lp)',isNaN(lp))
      this.isChangePlaceholderFlag = isNaN(lp)
      if(isNaN(lp)) return
      this.bearingInfo.LP = lp
      // 计算推荐产品
      if(this.bearingInfo.T != ''){
        this.countRecommendProduct(T,this.bearingInfo.LP)
      }
    },
    countCTvalAndLP(LPRB,N,D,d){
      let CT = ''
      let LPth = ''
      let result = ''
      CT = Number((1/(1+(0.00000347*(LPRB**0.71)*(N**1.24 *((D+d)**1.24)))))).toFixed(9)
      if(CT>=0.9){
        result = Number(LPRB).toFixed(2)
      }else{
        LPth = LPRB*((2.12-(1/CT))**-1.41)
        result = LPth.toFixed(2)
      }
      return result
    },
    countRecommendProduct(T,LP){
      // 产品1：（各产品LP-计算LP）绝对值最小的产品
      let tempList = productionList.filter(it=>{
        return it.T == T
      })
      if(!tempList.length) return
      tempList.forEach(it=>{
        it.difference = Math.abs(it.value-LP)
      })
      console.log('tempList.......',JSON.parse(JSON.stringify(tempList)))
      const productResultList = tempList.sort(this.sortArr('difference'))
      let flag = this.judgeIsEqual(productResultList)
      if(flag){
        this.production.one = productResultList[0].name
      }else{
        productResultList.forEach(it=>{
          it.difference = Math.abs(it.difference)
        })
        productResultList.sort(this.sortArr('difference'))
        let v1 = productResultList[0]
        let v2 = productResultList[1]
        let v3 = v1.index>v2.index ? v1.name : v2.name
        this.production.one = v3
      }
      // 产品2和产品3
      // 找到推荐的产品1后：
      // 剩余差值均为负值，按照绝对值最小前两个推荐2&3；
      // 剩余差值有一个正值，正值对应产品2，产品3取负值绝对值最小的产品；
      // 剩余差值有两个正值，按照大小对应产品2&3。
      // 注：若推荐时出现差值/绝对值相等的情况，均按照表格中从左到右的顺序推荐产品。
      tempList.splice(0,1)
      let greaterZero
      let lessZero
      tempList.forEach(it=>{
        it.difference = it.value-LP
      })
      greaterZero = tempList.filter(it=>{
        return it.difference>=0
      })
      lessZero = tempList.filter(it=>{
        return it.difference<0
      })
      console.log('greaterZero,lessZero',greaterZero,lessZero,tempList)
      if(lessZero.length == tempList.length){//剩余都是负数
        tempList.forEach(it=>{
          it.difference = Math.abs(it.difference)
        })
        let productObj = this.judgeIsEqual(tempList)
        this.production.two = productObj.two
        this.production.three = productObj.three
      }
      if(greaterZero.length==1){//只有一个正数
        this.production.two = greaterZero[0].name
        lessZero.forEach(it=>{
          it.difference = Math.abs(it.difference)
        })
        lessZero.sort(this.sortArr('difference'))
        this.production.three = lessZero[0].name
      }
      if(greaterZero.length>=2){
        let productObj = this.judgeIsEqual(greaterZero)
        this.production.two = productObj.two
        this.production.three = productObj.three
      }
    },
    sortArr(attr) {
      return function(a,b) {
        return a[attr] - b[attr]
      }
    },
    // 判断difference是否有相等的，相等的时候从左到右推荐
    judgeIsEqual(arr){
      arr.sort(this.sortArr('difference'))
      let isEqualFlag = false
      let list = []
      this.commonNumList = []
      let commonNumIndexList = []
      let production_obj = {}
      arr.forEach(it=>{
        list.push(Math.abs(it.difference))
      })
      let newList = [...new Set(list)]
      // isEqualFlag:true,没有相等的，false,有相等的数据
      isEqualFlag = newList.length == arr.length
      // 有相等的，先排序后取第一个和相等的比较
      if(!isEqualFlag){
        list.forEach(item=>{
          if(list.indexOf(item) != list.lastIndexOf(item) && this.commonNumList.indexOf(item) == -1){
            this.commonNumList.push(item)
          }
        })
        arr.forEach(it=>{
          if(it.difference == this.commonNumList[0]){
            commonNumIndexList.push(it.index)
          }
        })
        let newIndexList = commonNumIndexList.sort((a,b)=>{return a-b})
        if(arr[0].difference==this.commonNumList[0].difference){
          // 排序后和相同的数据正好处于第一位，按照产品顺序排序取值
          arr.forEach(it=>{
            if(it.index == newIndexList[0]){
              production_obj.two = it.name
            }
            if(it.index == newIndexList[1]){
              production_obj.three = it.name
            }
          })
        }else{
          production_obj.two = arr[0].name
          if(arr[1].difference==this.commonNumList[0].difference){
            arr.forEach(it=>{
              if(it.index == newIndexList[0]){
                production_obj.three = it.name
              }
            })
          }else{
            production_obj.three = arr[1].name
          }
        }
      }else{
        production_obj.two = arr[0].name
        production_obj.three = arr[1].name
      }
      // console.log('commonNumList',arr,this.commonNumList,commonNumIndexList,isEqualFlag)
      return production_obj
    },
  },
}
</script>
<style lang="scss" scoped>
.tip-content-text {
  box-sizing: border-box;
  padding: 10px;
  color: #999999;
  margin-bottom: 10px;
  font-size: 13px;
}
</style>
