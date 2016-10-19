/**
 * ****************************************************************************
 *
 * Copyright (c) 2016, Mindfire Solutions and/or its affiliates. All rights
 * reserved.
 * ___________________________________________________________________________________
 *
 *
 * NOTICE: All information contained herein is, and remains the property of
 * Mindfire and its suppliers,if any. The intellectual and technical concepts
 * contained herein are proprietary to Mindfire Solutions. and its suppliers and
 * may be covered by us and Foreign Patents, patents in process, and are
 * protected by trade secret or copyright law. Dissemination of this information
 * or reproduction of this material is strictly forbidden unless prior written
 * permission is obtained from Mindfire Solutions
 */
package com.emailchimp.conf;

/**
 *
 * @author baldeep
 */
import com.emailchimp.model.LoginUser;
import com.emailchimp.core.model.Account;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.dao.DataAccessException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.emailchimp.core.service.AccountService;

@Service("userDetailsService")
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    AccountService accountService;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException, DataAccessException {
        if (!"".equals(username)) {
            Account userProfile = accountService.getUserByEmail(username);

            if (null != userProfile) {
                final List<GrantedAuthority> auths;
                if (!userProfile.getUserRole().isEmpty()) {
                    auths = AuthorityUtils.commaSeparatedStringToAuthorityList(userProfile.getUserRole());
                } else {
                    auths = AuthorityUtils.NO_AUTHORITIES;
                }
                return new LoginUser(userProfile.getUserEmail(), userProfile.getUserPassword(),
                        true, userProfile.isAccountNonExpired(), userProfile.isCredentialsNonExpired(),
                        userProfile.isAccountNonLocked(), auths,
                        userProfile.getUserName(), userProfile.getUserMobile());
            }
        }
        return null;
    }
}
