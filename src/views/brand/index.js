import {searchPage, deleteById, addEntity, updateEntity, deleteAllPick} from '../../api/brand'
import base64Utils from "../../utils/base64Utils";

let brand = {
    name: "index",
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
            value2: '',
            tableData: [],
            searchParams: {
                currentPage: 1,
                pageSize: 5
            },
            formData: {},
            dialogTableVisible: false,
            dialogFormVisible: false,
            searchStr: '',
            total: 0,
            id: '',
            imageUrl: '',
            ids: []
        };
    },
    methods: {
        handleSelectionChange(val) {
            this.ids = val.map(item => item.id)
        },
        async searchPage() {
            let response = await searchPage(this.searchParams);
            this.total = response.total;
            this.tableData = response.data;
        },
        currentPageChange(page) {
            this.searchParams.currentPage = page
            this.searchPage()
        },
        search() {
            this.searchParams.searchStr = this.searchStr;
            this.searchParams.startTime = this.value2[0];
            this.searchParams.endTime = this.value2[1];
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
        async deleteById() {
            await deleteById(this.id)
            if ((this.total-1) == (this.searchParams.currentPage-1)*this.searchParams.pageSize && this.searchParams.currentPage != 1){
                this.searchParams.currentPage -= 1;
            }
            this.searchPage()
        },
        async getImageUrl(e) {
            let response = await base64Utils.getBase64Str(e.file);
            this.imageUrl = response;
            this.formData.brandLogo = response;
        },
        async addOrEdit() {
            if (this.formData.id) {
                await updateEntity(this.formData)
            } else {
                console.log("111")
                await addEntity(this.formData)
                this.searchPage();
            }
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
            if ((this.total-this.ids.length) == (this.searchParams.currentPage-1)*this.searchParams.pageSize && this.searchParams.currentPage != 1){
                this.searchParams.currentPage -= 1;
            }
            this.searchPage();
        }

    },
    created() {
        this.searchPage();
    }
}

export default brand;
