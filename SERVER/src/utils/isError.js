
const handleError = (res, statusCode, message) => {
    return res.status(statusCode).json(message)
}

export default handleError;