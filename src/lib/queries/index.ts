import { https } from '../https';

export const MUTATIONS = {
  authSignup: async function (data: { name: string; email: string }) {
    return await https.post(`/auth/initialize-signup`, data);
  },
  authSignupVerification: async function (data: {
    signupVerificationHash: string;
    otp: string;
  }) {
    return await https.post(`/auth/signup-verification`, data);
  },
  authInitializeAccountPassword: async function (data: { password: string }) {
    return await https.post(`/auth/initialize-account-password`, data);
  },
  authUploadFileCloudinary: async function (
    data: { file: File },
    fileName: string,
  ) {
    const params = new URLSearchParams();

    if (fileName) {
      params.append('fileName', fileName);
    }

    const queryString = params.toString();
    const url = `/auth/upload/file/cloudinary?${queryString}`;

    return await https.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  authInitializeBusinessProfile: async function (data: {
    businessName: string;
    businessAvatar: string;
  }) {
    return await https.post(`/auth/initialize-business-profile`, data);
  },
  authSignin: async function (data: { email: string; password: string }) {
    return await https.post(`/auth/signin`, data);
  },
  authForgotPassword: async function (data: { email: string }) {
    return await https.post(`/auth/forgot-password`, data);
  },
  authResetPasswordOtpVerification: async function (data: {
    email: string;
    otp: string;
  }) {
    return await https.post(`/auth/reset-password-otp-verification`, data);
  },
  authResetPassword: async function (data: {
    newPassword: string;
    passwordResetToken: string;
    accountId: string;
  }) {
    return await https.post(`/auth/reset-password`, data);
  },
  createEvent: async function (data: {
    name: string;
    category: string;
    date: string;
    time: string;
    location: string;
  }) {
    return await https.post(`/event/create`, data);
  },
};

export const QUERIES = {
  getAccountMeDetailed: async function () {
    return await https.get(`/account/me/detailed`);
  },
  getBusinessInfo: async function () {
    return await https.get(`/account/manage-business/business-info`);
  },
  getEvents: async function (page?: number, limit?: number) {
    const params = new URLSearchParams();

    if (page) {
      params.append('page', page.toString());
    }
    if (limit) {
      params.append('pageSize', limit.toString());
    }

    const queryString = params.toString();
    const url = `/event/fetch?${queryString}`;

    return await https.get(url);
  },
};
