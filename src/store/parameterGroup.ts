import { defineStore } from "pinia";


export const useParameterGroupStore = defineStore(
    'parameterGroup',
    () => {
        // 参数组
        const parameterGroup = ref({
            //单选
            radioGroup: {
                groupId:'',
                selectKey:'',
                selectName:''
            },
            //单选包含子组件
            radioSonGroup: {
                groupId:'',
                selectKey: '',
                selectName:''
            },
            //多选组
            multiGroup: {
                groupId:'',
                isGroup:'',
                selectKey:'',
                selectName:''
            },
            //仅选择组
            onlyGroup: {
                groupId:'',
            },
            //摄像头设备
            monitorGroup: {
                selectKey: '',
                selectName:'',
            },
        })
        

        // 清空参数组
        const clearParameterGroup = () => {
            //多选组
            parameterGroup.value = {
                radioGroup: {groupId:'',selectKey:'',selectName:''},
                radioSonGroup: {groupId:'',selectKey: '',selectName:''},
                multiGroup: {groupId:'',isGroup:'',selectKey:'',selectName:''},
                onlyGroup:{groupId:''},
                monitorGroup:{selectKey:'',selectName: ''}
            }
        }

        return {
            parameterGroup,
            clearParameterGroup,
        }
    },
)