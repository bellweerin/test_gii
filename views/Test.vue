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
          <div class="col-md-6">
            <div class="row mb-3">
              <div class="col-md-12"></div>
            </div>
            <div class="row mb-3">
              <div class="col-md-12">
                <!-- <button
                  class="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-car-in"
                >
                  เพิ่ม
                </button> -->
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-12">
                <table
                  class="table table-striped table-bordered border border-dark"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>เลขทะเบียน</th>
                      <th>เวลาเข้า</th>
                      <th>เวลาออก</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- <tr v-for="data in datas" :key="data">
                      <td>{{ data.id }}</td>
                      <td>{{ data.licenseNumber }}</td>
                      <td>{{ data.timeIn }}</td>
                      <td>{{ data.timeOut }}</td>
                    </tr> -->

                        <tr>
                            <td>1</td>
                    <td>กข-1234</td>
                    <td>14-02-2565 10:00:00</td>
                    <td>14-02-2565 13:35:00</td>
                    <td>
                      <button
                        class="btn btn-sm btn-warning text-white"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-car-out"
                      >
                        เวลาออก
                      </button>
                    </td>

                        </tr>
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="modal-car-out" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">เวลารถออก</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="card border-primary">
                <div class="card-body">
                  <div class="row gy-5">
                    <div class="col-md-6">
                      <label for="">เลขทะเบียนรถ</label>
                      <input
                        class="form-control"
                        readonly
                        type="text"
                        value="กข-1234"
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="">เวลาออก</label>
                      <input
                        class="form-control"
                        placeholder="15-01-2565 14:30:20"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                ปิด
              </button>
              <button type="button" class="btn btn-success">บันทึก</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Test",
  data() {
    return {
      datas: {},
      data: {},
    };
  },
  mounted() {
    this.getAll();
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
  },
};
</script>

<style scoped>
</style>