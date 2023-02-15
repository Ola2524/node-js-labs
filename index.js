const process = require('process');
const fs=require('fs');

if(process.argv[2]=="add")
{
    let data=JSON.parse(fs.readFileSync("students.txt",'utf-8'))
    // console.log(data)
    let student = {id:data.length+1,name:process.argv[3],grade:process.argv[4]}
    data.push(student);
    fs.writeFileSync("students.txt",JSON.stringify(data));
    console.log(data)   
}

else if(process.argv[2]=="list")
{
    let data=JSON.parse(fs.readFileSync("students.txt",'utf-8'))
    console.log(data)
    data.forEach(element => {
        console.log(element['id']);
        console.log(element['name']);
        console.log(element['grade']);
        console.log('\n');
    });
}

else if(process.argv[2]=="edit")
{
    let data=JSON.parse(fs.readFileSync("students.txt",'utf-8'))

    data.forEach(student => {
        if(student.id == parseInt(process.argv[4])){
            student.grade = process.argv[3]
        }
    });
    fs.writeFileSync("students.txt",JSON.stringify(data));
}

else if(process.argv[2]=="delete")
{
    let data=JSON.parse(fs.readFileSync("students.txt",'utf-8'))

    let id = parseInt(process.argv[3])-1
    data.splice(id,1)
    fs.writeFileSync("students.txt",JSON.stringify(data));
}

else if(process.argv[2]=="sum")
{
    let data=JSON.parse(fs.readFileSync("students.txt",'utf-8'))

    let sum = 0
    
    data.forEach(student => {
        sum += parseInt(student.grade)
    });
    console.log(sum);
}
else{
    console.log("error");
}