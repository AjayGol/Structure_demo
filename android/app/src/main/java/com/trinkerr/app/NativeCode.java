package com.trinkerr.app;

/**
 * Created on 30/04/18.
 */

import android.app.ActionBar;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;

import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.util.Log;
import android.view.Window;
import android.widget.LinearLayout;


import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import java.util.TimeZone;

import com.facebook.react.bridge.Callback;

public class NativeCode extends ReactContextBaseJavaModule {

    AlertDialog alertAlready = null;

    public NativeCode(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void showThemeAlert(String title, String messageText, String btnLeft, String btnRight,
                               boolean lightTheme,
                               final Callback letBtnPress, final Callback rightButtonPress) {
        try {

            if (alertAlready != null){
                try {
                    alertAlready.dismiss();
                }catch (Exception e){
                    e.printStackTrace();
                }

            }

            AlertDialog.Builder builder = new AlertDialog.Builder(this.getCurrentActivity(),android.R.style.Theme_DeviceDefault_Light_Dialog);
//            AlertDialog.Builder builder = null;
//            if(lightTheme){
//                builder = new AlertDialog.Builder(this.getCurrentActivity(),android.R.style.Theme_DeviceDefault_Dialog);
//            }else{
//                builder = new AlertDialog.Builder(this.getCurrentActivity(),android.R.style.Theme_DeviceDefault_Light_Dialog);
//            }
            builder.setTitle(title);
            builder.setMessage(messageText);
            if(btnRight.length() > 0){
                builder.setPositiveButton(btnRight, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        try {
                            rightButtonPress.invoke(i);
                        }catch (Exception e){
                            Log.e("MainApplication", "Catch - rightButtonPress");
                        }
                    }
                });
            }

            if(btnLeft.length() > 0){
                builder.setNegativeButton(btnLeft, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        try {
                            letBtnPress.invoke(i);
                        }catch (Exception e){
                            Log.e("MainApplication", "Catch - letBtnPress");
                        }
                    }
                });
            }
            builder.setCancelable(false);
            alertAlready = builder.show();
            Window window = alertAlready.getWindow();
            window.setLayout(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);

        } catch (Exception e) {
            //Error
            //letBtnPress.invoke("error");
        }
    }



    @Override
       public String getName() {
        return "AndroidNativeModule";
    }
}