module.exports.jobs = async function(req , res){
    return res.render('job' , {
        title : 'Jobs',
        showHeader : true,
        showFooter : true
    })
}