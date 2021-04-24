import {findAll,deleteByEntity} from "../../api/catgory";


let category={
    name: 'index',
    data() {
        return {
            tableData:[],
            isCollapse: true,
            formData:{},
            dialogVisible:false,
            deleteCategory : {},
            deleteLevel:-1,
            categoryVo:{}
        };
    },
    methods: {
        async findAll(){
             this.tableData = await findAll();
        },
        async deleteById(){
            /*if (this.deleteLevel == 1){
                for (let item of this.tableData){
                    if (item.id == this.deleteId){
                        console.log(item.id)
                        this.categoryVo = item;
                        console.log(this.categoryVo)
                        break
                    }
                }
            }else if (this.deleteLevel == 2){
                for (let item of this.tableData){
                    for (let value of item.list){
                        if (value.id == this.deleteId){
                            console.log(value.id)
                            this.categoryVo = value;
                            console.log(this.categoryVo)
                            break
                        }
                    }
                }
            }else {
                this.categoryVo = {}
            }*/
            console.log(this.deleteCategory)
            await deleteByEntity(this.deleteCategory);
            this.findAll();
        }
    },
    created() {
        this.findAll()
    }
}

export default category