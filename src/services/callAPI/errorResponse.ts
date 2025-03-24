
export const checkErrorMassage = async (data: any) => {
    let returnError = '';
    if (data.status === 401 || data.status === 204) {
        returnError = 'ไม่พบข้อมูลผู้ใช้งาน หรือไม่มีสิทธิ์ใช้งาน'
    } else if (data.status === 404) {
        returnError = 'ไม่พบฟังก์ชั่นที่ท่านเรียกใช้งาน'
    } else if (data.status === 500) {
        returnError = data.response.data.message
    } else if (!data.status) {
        returnError = 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้'
    } else {
        returnError = data.message
    }
    return returnError
};
