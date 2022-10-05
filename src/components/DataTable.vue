<template>
  <div id="data-table">
    <div class="container">
      <b-table
        class="table center"
        hover
        :fields="fields"
        :items="datas"
        :per-page="perPage"
        :current-page="currentPage"
        label-sort-asc=""
        label-sort-desc=""
        label-sort-clear=""
      >
        <template #cell(timeOut)="row">
          <div v-if="!row.item.timeOut">
            <button
              class="btn btn-warning"
              data-bs-toggle="modal"
              :data-bs-target="'#modal-car-out' + row.item.id"
            >
              Add Time Out
            </button>

            <!-- Modal -->
            <div
              class="modal fade"
              :id="'modal-car-out' + row.item.id"
              tabindex="-1"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div
                    class="alert alert-primary"
                    :id="'alert' + row.item.id"
                    role="alert"
                  >
                    Update Time out success
                  </div>
                  <div
                    class="alert alert-danger"
                    :id="'error' + row.item.id"
                    role="alert"
                  >
                    Create Data Error
                  </div>
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
                        <!-- ID -->
                        <input type="hidden" :value="row.item.id" />

                        <div class="row gy-5">
                          <div class="col-md-6">
                            <label for="">เลขทะเบียนรถ</label>
                            <input
                              class="form-control"
                              readonly
                              type="text"
                              :value="row.item.licenseNumber"
                              disabled
                            />
                          </div>
                          <div class="col-md-6">
                            <label for="">เวลาออก</label>
                            <input
                              v-model="data.timeOut"
                              class="form-control"
                              placeholder="15-01-2565 14:30:20"
                              type="datetime-local"
                              step="1"
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
                    <button
                      v-on:click="
                        updateTimeOut(row.item.id, row.item.licenseNumber)
                      "
                      type="button"
                      class="btn btn-success"
                    >
                      บันทึก
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>{{ row.item.timeOut }}</div>
        </template>
      </b-table>

      <b-container>
        <b-row class="justify-content-md-center">
          <b-col cols="12" md="auto"
            ><b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
            ></b-pagination
          ></b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
export default {
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      datas: [],
      fields: [
        { key: "id", lable: "#", sortable: true },
        { key: "licenseNumber", label: "License Number", sortable: true },
        { key: "timeIn", label: "Time in", sortable: true },
        { key: "timeOut", label: "Time out", sortable: true },
      ],
      data: {
        id: "",
        licenseNumber: "",
        timeOut: "",
      },
    };
  },
  mounted() {
    this.getAll();
  },
  computed: {
    rows() {
      return this.datas.length;
    },
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
    setData(id, licenseNumber) {
      this.data.id = id;
      this.data.licenseNumber = licenseNumber;

      this.data.timeOut = this.formatDate(this.data.timeOut);
    },
    updateTimeOut(id, licenseNumber) {
      this.setData(id, licenseNumber);
      //   console.log(this.data);
      axios
        .post("http://localhost:8080/api/car", this.data)
        .then((response) => {
          let success = response.data.success;
          if (success) {
            let alert = document.getElementById("alert" + this.data.id);
            // console.log(alert);
            alert.style.display = "block";
          }
        })
        .catch((error) => {
          console.log(error);
          console.log(error);
          let errorAlert = document.getElementById("error" + this.data.id);
          errorAlert.style.display = "block";
        });
    },
    formatDate(datetime) {
      let date_time = new Date(datetime);
      let day = date_time.getDate().toString().padStart(2, "0");
      let month = (date_time.getMonth() + 1).toString().padStart(2, "0");
      let year = date_time.getFullYear().toString().padStart(4, "0");
      let hour = date_time.getHours().toString().padStart(2, "0");
      let minute = date_time.getMinutes().toString().padStart(2, "0");
      let second = date_time.getSeconds().toString().padStart(2, "0");
      let timeIn =
        day +
        "-" +
        month +
        "-" +
        year +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;

      return timeIn;
    },
  },
};
</script>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
}
.table {
  width: 80%;
}
.alert {
  display: none;
}
</style>