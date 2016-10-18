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
package com.emailchimp.core.config.hibernate;

import java.io.Serializable;
import java.util.Locale;
import org.hibernate.boot.model.naming.Identifier;
import org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl;
import org.hibernate.engine.jdbc.env.spi.JdbcEnvironment;
import org.springframework.context.annotation.Configuration;

/**
 *
 * @author baldeep
 */
@Configuration
public class CustomNamingStrategy extends PhysicalNamingStrategyStandardImpl  implements Serializable{

    @Override
    public Identifier toPhysicalTableName(Identifier name, JdbcEnvironment context) {
      return addUnderscores(name);
    }
    
    @Override
	public Identifier toPhysicalColumnName(Identifier name, JdbcEnvironment context) {
		return addUnderscores(name);
	}

    protected static Identifier addUnderscores(Identifier name) {
        StringBuilder buf = new StringBuilder(name.getText().replace('.', '_'));
        for (int i = 1; i < buf.length() - 1; i++) {
            if (Character.isLowerCase(buf.charAt(i - 1))
                    && Character.isUpperCase(buf.charAt(i))
                    && Character.isLowerCase(buf.charAt(i + 1))) {
                buf.insert(i++, '_');
            }
        }
        return Identifier.toIdentifier(buf.toString().toLowerCase(Locale.ROOT));
    }
}
