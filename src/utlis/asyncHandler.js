const asyncHandler = (fn) => (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((error) => next(error));
    }
}


export {  asyncHandler }










// const asyncHandler = (fn) => async(req, res, next) => {
//     try{
//         await fn(req, res, next)
//     }catch(error){
//         res.status(error.code || 500).json({
//             status: error.status || 'error',
//             message: error.message || 'Internal Server Error',
//         })
//     }

// }