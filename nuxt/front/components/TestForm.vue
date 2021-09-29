<template>
  <div>
    <div>
      <form @submit.prevent="submitForm(student)">
        <div class="form-group row">
          <input
            type="text"
            class="form-control col-3 mx-2"
            placeholder="Name"
            v-model="student.name"
          />
          <input
            type="text"
            class="form-control cal-3 mx-2"
            placeholder="Couse"
            v-model="student.course"
          />
          <input 
            type="text"
            class="form-control col3 mx-2"
            placeholder="Rating"
            v-model="student.rating"
          />
          <button class="btn btn-success">Submit</button>
        </div>
      </form>
    </div>

    <div>
      <table class="table">
        <thead>
          <th>Name</th>
          <th>Course</th>
          <th>Rating</th>
        </thead>
          <tr v-for="student in students" :key="student.id" @dblclick="$data.student = student">
            <td>{{ student.name }}</td>
            <td>{{ student.course }}</td>
            <td>{{ student.rating }}</td>
            <td><button @click="deleteStudent(student)">x</button></td>
          </tr>
        </table>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      student:{
        name: "",
        course: "",
        rating: "",
      },
      students: [],
    };
  },
  async created(){
    await this.getStudents();
  },
  methods:{
    submitForm(student){
      // 新規にPOSTする場合はcrete , 既存にデータがある場合はputメソッドを利用するように条件分岐
      if(this.student.id === undefined) {
        this.createStudent();
      }else{
        this.editStudent(student);
      }
    },
    // データを全取得
    async getStudents() {
      const url = "/api/get_myapp";
      const response = await this.$axios.get(url);
      this.students = response.data;
    },
    // データを新規登録
    async createStudent() {
      await this.getStudents();
      const url = "/api/post_myapp/";
      this.$axios.defaults.xsrfCookieName = "csrftoken";
      this.$axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      await this.$axios.post(url, {
        name:   this.student.name,
        course: this.student.course,
        rating: this.student.rating,
      });
      await this.getStudents();
    },
    // データを編集
    async editStudent(student) {
      await this.getStudents();
      const url = "/api/put_myapp" + student.id + "/";
      const modify = {
        name:   this.student.name,
        course: this.student.course,
        rating: this.student.rating,
      };
      await this.$axios.put(url, modify);
      await this.getStudents();
      this.student = {};
    },
    // データを削除
    async editStudent(student) {
      await this.getStudents();
      const url = "/api/delete_myapp" + student.id + "/";
      const modify = {
        name:   this.student.name,
        course: this.student.course,
        rating: this.student.rating,
      };
      await this.$axios.delete(url);
      await this.getStudents();
    }
  }
}
</script>