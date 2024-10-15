import { authRole } from '@crema/constants/AppConst';



export const getUserFromJwtAuth = (user) => {
  
  if (user)
    return {
      _id: user._id,
userName: user.userName,
      email: user.email,
      mobile: user.mobile,
      address: user.address,
      profileUrl: user.profileUrl,
      verified: user.verified,
      photoURL: user.avatar,
       role:
        user.role === 'client'
          ? authRole.Client
          : authRole.Admin,
      businessId: user.businessId,
    };

  return user;
};
