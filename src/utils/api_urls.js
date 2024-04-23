export const baseUrl = 'http://127.0.0.1:8000'
// export const baseUrl = ''
export const loginUrl = baseUrl + '/account/api/login/'
export const logoutUrl = baseUrl + '/account/api/logout/'
export const pendingStudentAcUrl = baseUrl + '/account/pendingstudents/'
export const approveStudentAcUrl = baseUrl + '/account/studentac/approve/'
export const approveAllStudentAcUrl = baseUrl + '/account/studentac/approveall/'
export const deleteStudentAcUrl = baseUrl + '/account/studentac/delete/'
export const adminRolesUrl = baseUrl + '/account/admin-roles/'
export const membersUrl = baseUrl + '/account/members/'
export const sendInviatationUrl = baseUrl + '/account/members/sendinvite/'
export const searchMemberUrl = baseUrl + '/account/members/search/'
export const changeDeptUrl = baseUrl + '/account/members/changedept/'
export const deleteAcUrl = baseUrl + '/account/members/delete/'
export const adminProfileUpdateUrl = baseUrl + '/account/admin/updateprofile/'
export const sendRecoveryMailUrl = baseUrl + '/account/sendrecoverymail/'
export const resetPassowordUrl = baseUrl + '/account/resetpassoword/'
export const validateTokenUrl = baseUrl + '/account/validate-token/'
export const adminSignupApiUrl = baseUrl + '/account/api/admin/signup/'
export const studentSignupUrl = baseUrl + '/account/student/signup/'
export const studentProfileUpdateUrl = baseUrl + '/account/student/updateprofile/'
export const studentinfoUrl = baseUrl + '/account/progressive-studentinfo/'
// Clearance API
export const applyClearanceUrl = baseUrl + '/clearance/api/apply/'
export const userInfoUrl = baseUrl + '/clearance/api/userinfo/'
export const dashboardClearancesUrl = baseUrl + '/clearance/api/dashboard-clearances/'
export const adminDashboardStatsUrl = baseUrl + '/clearance/api/dashboard/adminstats/'
export const clearanceSectionUrl = baseUrl + '/clearance/api/section-clearances/'
export const departmentsUrl = baseUrl + '/clearance/api/departments/';
export const hallsUrl = baseUrl + '/clearance/api/halls/';
export const departmentsSectionsUrl = baseUrl + '/clearance/api/departments/sections/';
export const departmentsSessionsUrl = baseUrl + '/clearance/api/departments/sessions/';
export const assignMemberUrl = baseUrl + '/clearance/api/assignmember/';
export const unAssignMemberUrl = baseUrl + '/clearance/api/unassign-member/';
export const sessionStudentsUrl = baseUrl + '/clearance/api/sessions/students/';
export const sessionAddUrl = baseUrl + '/clearance/api/sessions/add/';
export const clearanceRemarksUrl = baseUrl + '/clearance/api/remarks/';
export const clearanceInfoUrl = baseUrl + '/clearance/api/clearanceinfo/';
export const clearanceInfoAsAdminUrl = baseUrl + '/clearance/api/clearanceinfo/adminview/';
export const clearanceRemarksInfoUrl = baseUrl + '/clearance/api/remarksinfo/';
export const clearanceReportDownloadUrl = baseUrl + '/clearance/report/download/';