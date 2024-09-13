const base = {
    get() {
        return {
            url : "http://localhost:8080/springboot6b9080cf/",
            name: "springboot6b9080cf",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springboot6b9080cf/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于web的积分制零食自选销售平台的设计与实现"
        } 
    }
}
export default base
