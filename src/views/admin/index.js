import {searchPage, deleteAllPick, deleteById, searchAllDept, findAreaChildren, add, update} from "../../api/admin";
import {getChildren} from "../../api/dept";
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'


let admin = {
    name: "admin",
    components: {Treeselect},
    data() {
        return {
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            tableData: [],
            formData: {},
            searchParams: {
                currentPage: 1,
                pageSize: 5
            },
            dialogFormVisible: false,
            searchStr: '',
            ids: [],
            id: '',
            value2: '',
            radio: 0,
            deptList: [],
            province: '',
            city: '',
            area: '',
            address: '',
            provinceList: [],
            cityList: [],
            areaList: [],

            normalizer(node) {
                return {
                    id: node.id,
                    label: node.deptName,
                    children: node.children,
                }
            },
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.ids = val.map(item => item.id)
        },
        async searchPage() {
            let response = await searchPage(this.searchParams);
            this.total = response.total;
            this.tableData = response.data;
            this.searchAllDept()
        },
        search() {
            this.searchParams = {
                currentPage: 1,
                pageSize: 5
            }
            this.searchParams.searchStr = this.searchStr;
            if (this.value2) {
                this.searchParams.startTime = this.value2[0];
                this.searchParams.endTime = this.value2[1];
            }
            this.searchParams.currentPage = 1
            this.searchPage();
        },
        async searchAllDept() {
            this.deptList = await searchAllDept();
        },
        clearSearchParams() {
            this.value2 = ''
            this.searchParams = {
                currentPage: 1,
                pageSize: 5
            }
            this.searchStr = ''
        },
        showDeleteMessage() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteAllPick()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        async deleteAllPick() {
            await deleteAllPick(this.ids)
            if ((this.total - this.ids.length) == (this.searchParams.currentPage - 1) * this.searchParams.pageSize && this.searchParams.currentPage != 1) {
                this.searchParams.currentPage -= 1;
            }
            this.searchPage();
        },
        async deleteById() {
            await deleteById(this.id)
            if ((this.total - 1) == (this.searchParams.currentPage - 1) * this.searchParams.pageSize && this.searchParams.currentPage != 1) {
                this.searchParams.currentPage -= 1;
            }
            this.searchPage()
        },
        async loadOptions({parentNode}) {
            parentNode.children = await getChildren(parentNode.id)
        },
        addOrEdit() {
            if (this.formData.id) {
                this.formData.adminAddress = this.province + " " + this.city + " " + this.area + " " + this.address
                this.updateAdmin()
            } else {
                this.formData.adminAddress = this.province + " " + this.city + " " + this.area + " " + this.address
                this.addAdmin()
            }
        },
        async addAdmin() {
            await add(this.formData)
            this.searchPage();
        },
        async updateAdmin() {
            await update(this.formData)
            this.searchPage();
        },
        async resetFormData() {
            this.formData = {
                gender: 0,
                adminAvatar: '',
                isEnable: false
            }
            this.province = ""
            this.city = ""
            this.area = ""
            this.address = ""
            this.provinceList = await findAreaChildren(0)
        },
        uploadSuccess(response) {
            this.formData.adminAvatar = response.data
        },

        async changeCityList(name) {
            await this.findCityList(name)
        },
        async changeAreaList(name) {
            await this.findAreaList(name)
        },
        async findCityList(name) {
            let index = this.provinceList.findIndex(item => item.name == name);
            let item = this.provinceList[index];
            // var filter = this.provinceList.filter(item=>item.name == name);
            // console.log(filter)
            //filter是集合
            this.cityList = await findAreaChildren(item.id)
            this.city = this.cityList[this.cityList.length - 1]
        },
        async findAreaList(name) {
            let index = this.cityList.findIndex(item => item.name == name);
            let item = this.cityList[index]
            this.areaList = await findAreaChildren(item.id)
            this.area = this.cityList[0]
        },
        async setFormData(obj) {
            this.formData = obj;
            this.address = ''
            let str = obj.adminAddress.split(' ');
            for (let index = 3; index < str.length; index++) {
                this.address += str[index]
                if (index != str.length - 1) {
                    this.address += " "
                }
            }
            this.province = str[0]
            this.provinceList = await findAreaChildren(0)
            await this.findCityList(this.province)
            this.city = str[1]
            await this.findAreaList(this.city)
            this.area = str[2]
        }
    },
    created() {
        this.searchPage()
    }
}

export default admin