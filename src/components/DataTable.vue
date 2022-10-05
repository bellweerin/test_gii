<template>
  <div id="data-table">
    <div class="container">
      <b-table
        class="table center"
        hover
        :fields="fields"
        :items="datas"
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
                  <!-- {{row.item.id}} -->
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
                        <input type="hidden" v-model="data.id" />
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
                    <button type="button" class="btn btn-success">
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
      <b-pagination
        cl
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>

      <!-- <button class="btn btn-primary"></button> -->
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
export default {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      datas: [],
      fields: [
        { key: "id", lable: "ID", sortable: true },
        { key: "licenseNumber", label: "License Nubber", sortable: true },
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

          //   console.log(typeof(this.datas[1].timeIn));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addTimeOut() {
    //   axios
    //     .post("http://localhost:8080/api/car", {
    //       id: this.data.id,
    //       licenseNumber: this.data.licenseNumber,
    //       timeOut: this.data.timeOut,
    //     })
    //     .then((response) => {
    //       console.log(response);
    //       
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
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
  width: 50%;
}
</style>