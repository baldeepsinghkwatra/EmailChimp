package com.emailchimp.conf;

import java.util.Calendar;
import java.util.GregorianCalendar;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Calendar calendar = GregorianCalendar.getInstance();
//		System.out.println(calendar.get(Calendar.MONDAY));
//		System.out.println(calendar.get(Calendar.SUNDAY));
//		
//		Object o =  calendar.set(Calendar.DAY_OF_WEEK, calendar.MONDAY);
//		
//		boolean s = calendar.set(java.util.Calendar.DAY_OF_MONTH, 1)  && 1==1 ?true: false;
//		
//				calendar.add(field, amount);
//		calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
//		
//		System.out.println(calendar.getTime());
//
//		calendar.set(Calendar.DATE,calendar.get(Calendar.DATE)+7 );
		calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
		System.out.println(calendar.getTime());
		
		calendar.set(Calendar.DAY_OF_WEEK, calendar.SUNDAY);
		System.out.println(calendar.getTime());
		
//		calendar.add(Calendar.DATE,7 );
		calendar.set(Calendar.DAY_OF_WEEK, calendar.SATURDAY);
		System.out.println(calendar.getTime());
//		
		

	}
}
