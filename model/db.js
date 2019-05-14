// 数据库
const MongoClient=require('mongodb').MongoClient;
const url='mongodb://localhost:27017/';

function __connect(callback){
	MongoClient.connect(url,(err,db)=>{
		// db数据文件
		callback(db)
	})
}
module.exports.insert=function(dbase,col,obj,res,callback1){
	__connect(function(db){
		if(obj instanceof Array){
			obj=obj
		}else{
			obj=[obj]
		}
		db.db(dbase).collection(col).insertMany(obj,(err,res1)=>{
			if(err) return;
			callback1(res1)
		})
	})
};
module.exports.find=function(dbase,col,obj,res,callback1,mysort1,m1,n1){
	var l=arguments.length;
	__connect(function(db){
		var m=0;
		var n=0;
		var mysort={};
		if(l===5){

    } else if(l===6){
			mysort=mysort1;
		}else if(l===7){
			mysort=mysort1;
			m=m1

		}else if(l===8){
			mysort=mysort1;
			m=m1;
			n=n1
		}
		db.db(dbase).collection(col).find(obj).sort(mysort).skip(m).limit(n).toArray((err,res1)=>{
			callback1(res1)
		})
	})
};
module.exports.update=function(dbase,col,obj,updateStr,res){
	__connect(function(db){
		db.db(dbase).collection(col).updateMany(obj, updateStr, function(err, res1) {
	        if (err) throw err;
	    });
	})
};
module.exports.delete=function(dbase,col,obj,res){
	__connect(function(db){
		db.db(dbase).collection(col).deleteMany(obj,function(err, res1) {
	        if (err) throw err;
	    });
	})
};
