function sleep(ms) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > ms){
            break;
        }
    }
}

var alpha = function(name,age){
    this.name = name;
    this.age = age;
    this.result = function(){
        console.log(this.name, this.age);
    }
}
