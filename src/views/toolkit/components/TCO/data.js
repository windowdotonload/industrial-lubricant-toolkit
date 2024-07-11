import { simpleDeepClone } from "../../../../global/customerApi";
export const calcState = {
  A: "",
  a: "",
  b: "",
  c: 1,
  aa: 1,
  B: "",
  d: "",
  e: "",
  C: "",
  f: "",
  g: "",
  A_Gather_Res: 0,

  B_Changeoil_Unit: "L",
  B_Addoil_Unit: "L",
  B_fuel_type: "柴油",
  D: "",
  bb: "",
  cc: "",
  h: "",
  F: "",
  i: "",
  j: "",
  G: "",
  k: "",
  "l+": "",
  m: "",
  H: "",
  n: "",
  "o+": "",
  p: "",
  B_Gather_Res_1: 0,
  B_Gather_Res_2: 0,

  II: "",
  q: "",
  J: "",
  K: "",
  r: "",
  s: "",
  t: "",
  L: "",
  u: "",
  M: "",
  N: "",
  C: "",
  OO: "",
  i: "",
  v: "",
  j: "",
  w: "",
  P: "",
  Q: "",
  xx: "",
  R: "",
  y: "",
  SS: "",
  z: "",
  C_Gather_Res: 0,

  img_url_safe: "",
  img_url_enviro: "",
  img_url_efficient: "",

  safe_add_suffix: 0,
  enviro_add_suffix_1: 0,
  enviro_add_suffix_2: 0,
  efficient_add_suffix: 0,
};

window.GenerateCalcFunc = null;

export const handleFloat = (val = 0, floatNum = 2, len = 9) => {
  return parseInt(val.toFixed(floatNum)).toString().length > len ? Number(val).toExponential(3) : parseFloat(val.toFixed(floatNum));
};

export const GenerateCalcFunc = (state) => {
  return (window.GenerateCalcFunc = {
    calcSafe_1: () => {
      const val = state.a * state.b * state.c * state.aa;
      state.A = handleFloat(val);
    },
    calcSafe_2: () => {
      const val = state.d * state.e * state.c * state.aa;
      state.B = handleFloat(val);
    },
    calcSafe_3: () => {
      const val = state.f * state.g * state.c * state.aa;
      state.C = handleFloat(val);
    },
    calcSafe_Gather: (additionalNum) => {
      if (additionalNum != undefined && additionalNum.toString()) state.safe_add_suffix = additionalNum;
      state.A_Gather_Res = Number(state.A) + Number(state.B) + Number(state.C) + state.safe_add_suffix;
    },

    B_changeunit: (key, val) => {
      state[key] = val;
    },
    calcEnviro_1: () => {
      const val = (state.bb - state.cc) * state.h * state.c;
      state.D = handleFloat(val);
    },
    calcEnviro_2: () => {
      const val = (state.i - state.j) * state.c;
      state.F = handleFloat(val);
    },
    calcEnviro_3: () => {
      const val = state.k * state["l+"] * (state.m / 100) * state.c * state.TCOP1;
      state.G = handleFloat(val);
    },
    calcEnviro_4: () => {
      switch (state.B_fuel_type) {
        case "柴油":
          const val1 = state.n * (state["o+"] / 100) * (state.p / 100) * state.TCOP2 * state.c;
          state.H = handleFloat(val1);
          break;
        case "汽油":
          const val2 = state.n * (state["o+"] / 100) * (state.p / 100) * state.TCOP3 * state.c;
          state.H = handleFloat(val2);
          break;
      }
    },
    calcEnviro_Gather: (sum) => {
      let res1, res2;
      if (sum) {
        res1 = sum.res1;
        res2 = sum.res2;
      }
      if (sum != undefined && res1.toString()) state.enviro_add_suffix_1 = res1;
      if (sum != undefined && res2.toString()) state.enviro_add_suffix_2 = res2;

      const D = state.B_Changeoil_Unit == "L" ? state.D : Number(state.D) / 0.87;
      const F = state.B_Addoil_Unit == "L" ? state.F : Number(state.F) / 0.87;
      state.B_Gather_Res_1 = Number(D) + Number(F) + state.enviro_add_suffix_1;
      state.B_Gather_Res_2 = Number(state.G) + Number(state.H) + state.enviro_add_suffix_2;
    },

    calcEfficient_1: () => {
      const tempVal = (state.A / state.aa) * state.q;
      const val = tempVal.toFixed(0).toString().length > 9 ? Number(tempVal).toExponential(3) : parseFloat(tempVal.toFixed(2));
      state.II = val;
    },
    calcEfficient_2: () => {
      const tempVal = (state.B / state.aa) * state.q;
      const val = tempVal.toFixed(0).toString().length > 9 ? Number(tempVal).toExponential(3) : parseFloat(tempVal.toFixed(2));
      state.J = val;
    },
    calcEfficient_3: () => {
      const tempVal = (state.r - state.s) * state.t * state.c;
      const val = tempVal.toFixed(0).toString().length > 9 ? Number(tempVal).toExponential(3) : parseFloat(tempVal.toFixed(2));
      state.K = val;
    },
    calcEfficient_4: () => {
      const tempVal = state.A * state.u;
      const val = tempVal.toFixed(0).toString().length > 9 ? Number(tempVal).toExponential(3) : parseFloat(tempVal.toFixed(2));
      state.L = val;
    },
    calcEfficient_5: () => {
      const tempVal = state.B * state.u;
      const val = tempVal.toFixed(0).toString().length > 9 ? Number(tempVal).toExponential(3) : parseFloat(tempVal.toFixed(2));
      state.M = val;
    },
    calcEfficient_6: () => {
      const tempVal = state.C * state.u;
      const val = tempVal.toFixed(0).toString().length > 9 ? Number(tempVal).toExponential(3) : parseFloat(tempVal.toFixed(2));
      state.N = val;
    },
    calcEfficient_7: () => {
      const tempVal = (state.i * state.v - state.j * state.w) * state.c;
      const val = tempVal.toFixed(0).toString().length > 9 ? Number(tempVal).toExponential(3) : parseFloat(tempVal.toFixed(2));
      state.OO = val;
    },
    calcEfficient_8: () => {
      const tempVal = (state.bb * state.h * state.v - state.cc * state.h * state.w) * state.c;
      const val = tempVal.toFixed(0).toString().length > 9 ? Number(tempVal).toExponential(3) : parseFloat(tempVal.toFixed(2));
      state.P = val;
    },
    calcEfficient_9: () => {
      const tempVal = ((Number(state.D) + Number(state.F)) / 1000) * Number(state.xx);
      const val = tempVal.toFixed(0).toString().length > 9 ? Number(tempVal).toExponential(3) : parseFloat(tempVal.toFixed(2));
      state.Q = val;
    },
    calcEfficient_10: () => {
      const tempVal = state.k * state["l+"] * (state.m / 100) * state.y * state.c;
      const val = tempVal.toFixed(0).toString().length > 9 ? Number(tempVal).toExponential(3) : parseFloat(tempVal.toFixed(2));
      state.R = val;
    },
    calcEfficient_11: () => {
      const val = simpleDeepClone(state);
      const tempVal = val.n * (val["o+"] / 100) * (val.p / 100) * val.z * val.c;
      const val_res = tempVal.toFixed(0).toString().length > 9 ? Number(tempVal).toExponential(3) : parseFloat(tempVal.toFixed(2));
      state.SS = val_res;
    },
    calcEfficient_sequence: () => {
      let num = 11;
      while (num--) {
        Function(`window.GenerateCalcFunc.calcEfficient_${num + 1}()`)();
      }
    },
    calcEfficient_Gather: (additionalNum) => {
      if (additionalNum != undefined && additionalNum.toString()) state.efficient_add_suffix = additionalNum;
      let sum = 0;
      ["II", "J", "K", "L", "M", "N", "OO", "P", "Q", "R", "SS"].forEach((key) => {
        sum += Number(state[key]);
      });
      state.C_Gather_Res = sum + state.efficient_add_suffix;
    },
  });
};
