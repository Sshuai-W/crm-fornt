import {searchPage, getChildren, addDept, updateDept, deleteById} from "../../api/dept";
import Treeselect from '@riophae/vue-treeselect'

let dept = {
    components: {Treeselect},
    name: 'index',
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
            dialogFormVisible: false,
            searchStr: '',
            value2: '',
            searchParams: {
                currentPage: 1,
                pageSize: 5
            },
            formData: {},
            tableData: [],
            ids: [],
            total: 0,
            radio: 0,
            tableKey:'',
            id:'',
            address:'',
            normalizer(node) {
                return {
                    id: node.id,
                    label: node.deptName,
                }
            },
        };
    },
    methods: {
        async searchPage() {
            let response = await searchPage(this.searchParams);
            this.total = response.total;
            this.tableData = response.data;
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
        clearSearchParams() {
            this.value2 = ''
            this.searchParams = {
                currentPage: 1,
                pageSize: 5
            }
            this.searchStr = ''
        },
        handleSelectionChange(val) {
            this.ids = val.map(item => item.id)
        },
        currentPageChange(page) {
            this.searchParams.currentPage = page;
        },
        async load(tree, treeNode, resolve) {
            let response = await getChildren(tree.id)
            tree.children = response
            resolve(response)
        },
        async deleteById() {
            await deleteById(this.id);
            await this.searchPage();
            this.tableKey = Symbol(new Date().toString())
        },
        resetFormData() {
            this.formData = {
                deptSort: 1,
            }
            this.radio = 0
        },
        async loadOptions({parentNode}) {
            parentNode.children = await getChildren(parentNode.id)
        },
        async addOrEdit() {
            if (this.formData.id) {
                await this.updateDept()
            } else {
                await this.addDept()
            }
            await this.searchPage();
            this.tableKey = Symbol(new Date().toString())
        },
        async updateDept() {
            if (this.radio == 0) {
                this.formData.parentId = 0;
            }
            await updateDept(this.formData)
        },
        async addDept() {
            if (this.radio == 0) {
                this.formData.parentId = 0;
            }
            await addDept(this.formData)
        },
        getFormData(obj){
            this.formData = obj;
            if (this.formData.parentId != 0){
               this.radio = 1
            }
        },

    },
    created() {
        this.searchPage();
    }
}

export default dept