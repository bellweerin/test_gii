<template>
  <div id="test">
    <div class="container">
      <div class="container-fluid" style="margin-top: 30px">
        <div class="row">
          <div class="col-md-3">
            <div class="row mb-3">
              <div class="col-md-12">
                <ul class="list-group">
                  <li
                    class="
                      list-group-item list-group-item-info
                      border-bottom-0 border-info
                    "
                  >
                    งาน
                  </li>
                  <li class="list-group-item border-bottom-0 border-info">
                    1. แสดงข้อมูลจาก backend ลงในตาราง
                  </li>
                  <li class="list-group-item border-bottom-0 border-info">
                    2. กดปุ่มเพิ่ม - รับค่าจากฟอร์มและส่งค่าไปเพิ่มข้อมูลได้
                  </li>
                  <li class="list-group-item border-bottom-0 border-info">
                    3. กดปุ่มเวลาออก - รับค่าจากฟอร์มและส่งค่าไปอัพเดตข้อมูลได้
                  </li>
                  <li class="list-group-item border-bottom-0 border-info">
                    4. ช่องเวลาใช้ date-time picker รับค่า (optional)
                  </li>
                  <li class="list-group-item border-top-0 border-info">
                    5. ตารางทำ pagination (optional)
                  </li>
                </ul>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-12">
                <ul class="list-group">
                  <li
                    class="
                      list-group-item list-group-item-warning
                      border-bottom-0 border-warning
                    "
                  >
                    API
                  </li>
                  <li class="list-group-item border-bottom-0 border-warning">
                    1. Get all แสดงข้อมูลทั้งหมด
                  </li>
                  <li class="list-group-item border-bottom-0 border-warning">
                    2. Get detail แสดงข้อมูลตาม id ที่ส่งไป
                  </li>
                  <li class="list-group-item border-bottom-0 border-warning">
                    3. Add เพิ่มข้อมูล
                  </li>
                  <li class="list-group-item border-bottom-0 border-warning">
                    4. Update อัพเดตข้อมูล
                  </li>
                  <li class="list-group-item border-top-0 border-warning">
                    5. Create data เพิ่มข้อมูลตัวอย่าง
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col">
            <DataTable></DataTable>
            <FormData></FormData>
          </div>
        </div>
      </div>
      <button
        id="special"
        v-on:mouseover="mouseAction()"
        v-on:click="mouseAction()"
        v-on:mousemove="mouseAction()"
        class="btn btn-danger"
      >
        Special Click !
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DataTable from "../src/components/DataTable";
import FormData from "../src/components/FormData";
import anime from "animejs";
export default {
  name: "Test",
  components: { DataTable, FormData },
  data() {
    return {
      datas: {},
      data: {},
    };
  },
  mounted() {
    this.getAll();
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.0/anime.min.js"
    );
    document.head.appendChild(recaptchaScript);
  },
  methods: {
    getAll() {
      axios
        .get("http://localhost:8080/api/car?page=1")
        .then((response) => {
          this.datas = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addData() {
      axios
        .post("http://localhost:8080/api/car?page=1")
        .then((response) => {
          // location.reload()
          console.log(response);
          alert("create donation success");
          //this.$router.push("/");
          // <router-link :to="{name: 'Donation', params: {'d_id': donation.id}}">
        })
        .catch((error) => {
          console.log(error);
        });
    },
    randomNumber(num) {
      return Math.floor(Math.random() * (num + 1));
    },
    animateMove(element, prop, pixels) {
      let animation = anime({
        targets: element,
        [prop]: `${pixels}px`,
        easing: "easeOutCirc",
      });
      return animation;
    },
    mouseAction() {
      let button = document.getElementById("special");
      const top = this.randomNumber(window.innerHeight);
      const left = this.randomNumber(window.innerWidth);

      let animation_left = this.animateMove(button, "left", left);
      let animation_top = this.animateMove(button, "top", top);

      animation_left.play();
      animation_top.play();
    },
  },
};
</script>

<style scoped>
#special {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 1.5rem;
  border-radius: 5px;
}
</style>