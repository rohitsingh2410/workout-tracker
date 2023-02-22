import axios from "axios";
import { API_URL } from "./Config/config";
import moment from "moment";

export class ApiCalls {
  static async tokenExpired(){
    //window.location='/login'
  }
  static async getuserInfo() {
    let token = await localStorage.getItem("token");
    // check in localStorage first.
    let name = await localStorage.getItem("name");
    let email = await localStorage.getItem("email");
    let gender = await localStorage.getItem("gender");
    let dateStr = moment().format('MMMM Do YYYY');
    if(name && email && gender) {
      console.log("cache info")
      return { status: true, data: {name: name, email: email, gender: gender,dateStr:dateStr}};
    }

    try {
      let userInfo = await axios.get(`${API_URL}/api/userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (userInfo.status === 200) {
        // save jwt to local storage and redirect.
        await localStorage.setItem("name",userInfo.data.name);
        await localStorage.setItem("email",userInfo.data.email);
        await localStorage.setItem("gender",userInfo.data.gender);
        userInfo.data['dateStr']=dateStr;
        return { status: true, data: userInfo.data };
      } else {
      }
    } catch (e) {
      if(e.response.status===401){
        this.tokenExpired()
      }
      console.log("error", e.response.data.error.message);
      return { status: false, message: e.response.data.error.message };
    }
  }

  static async registerUser(data) {
    try {
      let userCreation = await axios.post(
        `${API_URL}/api/auth/local/register`,
        data
      );
      if (userCreation.status === 200) {
        // save jwt to local storage and redirect.
        localStorage.setItem("token", userCreation.data.jwt);
        window.location = "/feed";
      } else {
      }
    } catch (e) {
      console.log("error", e.response.data.error.message);
      return { status: false, message: e.response.data.error.message };
    }
  }

  static async createWorkout(data) {
    let token = await localStorage.getItem("token");
    try {
      let workoutCreation = await axios.post(
        `${API_URL}/api/createmyworkout`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("workoutCreation", workoutCreation);
      if (workoutCreation.status === 200) {
        // save jwt to local storage and redirect.
        return { status: true };
      } else {
      }
    } catch (e) {
      if(e.response.status===401){
        this.tokenExpired()
      }
      console.log("error", e.response.data.error.message);
      return { status: false, message: e.response.data.error.message };
    }
  }

  static async fetchMyWorkout(data) {
    let token = await localStorage.getItem("token");
    try {
      let fetchWorkout = await axios.get(`${API_URL}/api/fetchmyworkout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("fetchWorkout", fetchWorkout);
      if (fetchWorkout.status === 200) {
        // save jwt to local storage and redirect.
        return { status: true, data: fetchWorkout.data.data };
      } else {
      }
    } catch (e) {
      if(e.response.status===401){
        this.tokenExpired()
      }
      console.log("error", e.response.data.error.message);
      return { status: false, message: e.response.data.error.message };
    }
  }

  static async getWorkoutByID(id) {
    let token = await localStorage.getItem("token");
    try {
      let fetchWorkout = await axios.get(
        `${API_URL}/api/user-workout-splits/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("fetchWorkout", fetchWorkout);
      if (fetchWorkout.status === 200) {
        // save jwt to local storage and redirect.
        return { status: true, data: fetchWorkout.data.data };
      } else {
      }
    } catch (e) {
      if(e.response.status===401){
        this.tokenExpired()
      }
      console.log("error", e.response.data.error.message);
      return { status: false, message: e.response.data.error.message };
    }
  }
  static async getCurrentWeek() {
    var currentDate = moment();

    var weekStart = currentDate.clone().startOf("isoWeek");
    var weekEnd = currentDate.clone().endOf("isoWeek");

    var days = [];

    for (var i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, "days").format("DD/MM/YYYY"));
    }

    console.log(days);
    return days;
  }
  static async getCurrentMonth(year=moment().year(),month=moment().month()) {
    var monthDate = moment(year+'-'+month, 'YYYY-MM');
          var daysInMonth = monthDate.daysInMonth();
          var arrDays = [];
          while(daysInMonth) { 
            var current = moment().date(daysInMonth);
            arrDays.push(current.format('DD/MM/YYYY'));
            daysInMonth--;
          }
          return arrDays.reverse();
  }
  static async logData(data) {
    let token = await localStorage.getItem("token");
    try {
      let logger = await axios.post(`${API_URL}/api/logger`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("logger", logger);
      if (logger.status === 200) {
        // save jwt to local storage and redirect.
        return { status: true, data: logger.data.data };
      } else {
      }
    } catch (e) {
      if(e.response.status===401){
        this.tokenExpired()
      }
      console.log("error", e.response.data.error.message);
      return { status: false, message: e.response.data.error.message };
    }
  }
  static async searchLog(data) {
    let token = await localStorage.getItem("token");
    try {
      let searchlog = await axios.post(`${API_URL}/api/searchlog`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("searchlog", searchlog);
      if (searchlog.status === 200) {
        // save jwt to local storage and redirect.
        console.log("here......")
        return { status: searchlog.data.status, data: searchlog.data.data,lastWorkoutLog:searchlog.data.lastWorkoutLog };
      } else {
      }
    } catch (e) {
      if(e.response.status===401){
        this.tokenExpired()
      }
      console.log("error", e.response.data.error.message);
      return { status: false, data: [] };
    }
  }

  static async getGraphData(type,extraInfo) {
    let token = await localStorage.getItem("token");
    try {
      let payload={
        type: type,
      }
      if(extraInfo){
        payload.workoutName=extraInfo
      }
      let getGraphData = await axios.post(
        `${API_URL}/api/getgraph`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (getGraphData.status === 200) {
        // save jwt to local storage and redirect.

        return { status: true, data: getGraphData.data.data ,workoutsPerformed:getGraphData.data.workoutsPerformed};
      } else {
      }
    } catch (e) {
      if(e.response.status===401){
        this.tokenExpired()
      }
      console.log("error", e.response.data.error.message);
      return { status: false, data: [] };
    }
  }

  static async setFeedback(msg){
    let token = await localStorage.getItem("token");
    try {
      let setFeedback = await axios.post(`${API_URL}/api/userfeedback`, {
        msg:msg,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("setFeedback", setFeedback);
      if (setFeedback.status === 200) {
        // save jwt to local storage and redirect.

        return { status: setFeedback.data.status, data: setFeedback.data.data };
      } else {
      }
    } catch (e) {
      if(e.response.status===401){
        this.tokenExpired()
      }
      console.log("error", e.response.data.error.message);
      return { status: false, data: [] };
    }
  }
  static async login(payload){
    try {
      let loginUser = await axios.post(`${API_URL}/api/auth/local`,payload);
      console.log("loginUser", loginUser);
      if (loginUser.status === 200) {
        // save jwt to local storage and redirect.
        let token = loginUser.data.jwt;
        await localStorage.setItem("token",token)
        return { status: true, data: loginUser.data };
      } else {
      }
    } catch (e) {
      console.log("error", e.response.data.error.message);
      return { status: false, data:e.response.data.error.message};
    }
  }
}
