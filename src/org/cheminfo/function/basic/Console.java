package org.cheminfo.function.basic;


import java.util.Date;
import java.util.HashMap;

import org.cheminfo.function.Function;
import org.cheminfo.function.scripting.callback.CallBack;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class Console extends Function{
    
	public final static int LOG=110;
	public final static int FATAL=100;
	public final static int ERROR=90;
	public final static int WARN=80;
	public final static int INFO=70;
	public final static int DEBUG=60;
	public final static int TRACE=50;
	public final static int[] levels={TRACE,DEBUG,INFO,WARN,ERROR,FATAL,LOG};
	
	public int logLevel=WARN;
	
	private JSONArray logs=new JSONArray();
	private long startingDate=(new Date()).getTime();
	private HashMap<String, Timer> timers = new HashMap<String, Timer>();
	private CallBack logCallBack=new CallBack();
	
	
	public void setLogLevel(int logLevel) {
		this.logLevel=logLevel;
	}
	
	public String getLogLevel(){
		return getErrorLabel(this.logLevel);
	}
	
	public boolean startTime(String name) {
		if(!timers.containsKey(name)){
			timers.put(name, new Timer());
			return true;
		}
		return false;
	}
	
	public boolean pauseTime(String name) {
		if(timers.containsKey(name)){
			timers.get(name).pause();
			return true;
		}
		return false;
	}
	
	public boolean playTime(String name) {
		if(timers.containsKey(name)){
			timers.get(name).play();
			return true;
		}
		return false;
	}
	
	public long stopTime(String name){
		if(timers.containsKey(name)){
			long time = timers.get(name).getTime();
			timers.remove(name);
			return time;
		}
		return 0;
	}
	
	/**
	 * 
	 * @param id: The id of the object to store the message
	 * @param caller: The name of the class or the function that generates it.
	 * @param info: The info message
	 */
	public boolean log(int id, String caller, String info, String stacktrace){
		if (id<logLevel) return false;
		JSONObject log = new JSONObject();
		JSONObject logEntry= new JSONObject();
		try {
			log.put("type", "log").put("value", logEntry);
			logEntry.put("level", id);
			logEntry.put("label", getErrorLabel(id));
			logEntry.put("stacktrace", stacktrace);
			logEntry.put("time", (new Date()).getTime()-startingDate);
			logEntry.put("caller", caller);
			logEntry.put("description", info);
			this.logs.put(logEntry);
			logCallBack.callback(log);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return true;
	}
	
	public void clear() {
		try {
			logCallBack.callback(new JSONObject().put("type", "clear"));
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
	
	public JSONArray getLogs() {
		return logs;
	}
	
	public void setCallBack(CallBack callback) {
		logCallBack=callback;
	}
	
	public String getErrorLabel(int error) {
		switch (error) {
			case LOG:
				return "log";
			case FATAL:
				return "fatal";
			case ERROR:
				return "error";
			case WARN:
				return "warn";
			case INFO:
				return "info";
			case DEBUG:
				return "debug";
			case TRACE:
				return "trace";
		}
		return "unknown";
	}
}

class Timer {
	private long startTime = System.currentTimeMillis();
	private long pauseStart;
	private boolean state=true; // true: running, false: paused
	
	public void pause(){
		if(state){
			pauseStart = System.currentTimeMillis();
			state=false;
		}
	}
	
	public void play(){
		if(!state){
			startTime+=System.currentTimeMillis()-pauseStart;
			state=true;
		}
	}
	
	public long getTime(){
		if(state)
			return System.currentTimeMillis()-startTime;
		else
			return pauseStart-startTime;
	}
}