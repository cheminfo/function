package org.cheminfo.function.util;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class JavaScriptMin {

	final static int IN_JAVASCRIPT = 0;
	final static int IN_DOCS = 1;

	private JSONObject helpJSON = new JSONObject();
	private StringBuilder codeJS = new StringBuilder();

	private int status = IN_JAVASCRIPT;

	private JSONObject currentObject = null;
	private ElementBuilder currentElement = null;
	private boolean inDescription = false;

	public boolean processFile(BufferedReader reader) throws IOException {
		String currentLine;
		while ((currentLine = reader.readLine()) != null) {
			try {
				this.processLine(currentLine);
			} catch (JSONException e) {
				System.err.append("Problems evaluating the help content :"
						+ currentLine);
				e.printStackTrace();
				return false;
			}
		}
		endCurrent();
		return true;
	}

	public void processLine(String line) throws JSONException {
		line = line.replaceAll("^[ \\t]+", "").replaceAll("[ \\t]+$", "")
				.replaceAll("[ \\t]+", " ");
		if (status == IN_JAVASCRIPT) {
			if (line.startsWith("/**")) {
				status = IN_DOCS;
			} else {
				if (!line.startsWith("//") && line.length() > 0)
					codeJS.append(line + "\n");
			}
		} else {
			line = line.replaceAll("^[ \\t]+", "");
			if (line.startsWith("*/")) {
				status = IN_JAVASCRIPT;
			} else {
				line = line.replaceAll("^[ \\t\\*]+", "");

				if (line.startsWith("@")) {
					inDescription = false;
				}
				if (line.startsWith("/")) {
					status = IN_JAVASCRIPT;
				} else if (line.startsWith("@object")) {
					endCurrent();
					String objectName = line.replaceAll("^[^ ]* ", "");
					currentObject = this.getObjectFromName(objectName);
					currentElement = new ElementBuilder(objectName,
							ElementType.Object);
					inDescription = true;
				} else if (currentObject == null)
					return;
				else if (line.startsWith("@constructor")) {
					if (currentElement == null
							|| currentElement.getType() != ElementType.Object)
						return;
					currentElement.setType(ElementType.Constructor);
				} else if (line.startsWith("@function")) {
					endCurrent();
					String function = line.replaceAll("^[^ ]* ", "");
					currentElement = new ElementBuilder(function,
							ElementType.Function);
					inDescription = true;
				} else if (line.startsWith("@property")) {
					endCurrent();
					String property = line.replaceAll("^[^ ]* ", "");
					String name = property.replaceAll(" .*", "");

					String type = property.replaceAll("^[^ ]* ", "")
							.replaceAll(" .*", "");

					currentElement = new ElementBuilder(name,
							ElementType.Property);
					currentElement.addItem(name, type, ItemType.Return);
					inDescription = true;
				} else if (line.startsWith("@define")) {
					String define = line.replaceAll("^[^ ]* ", "");
					String name = define.replaceAll(" .*", "");
					String definition = define.replaceAll("^[^ ]* ", "");
					if (!helpJSON.has("!define"))
						helpJSON.put("!define", new JSONObject());
					helpJSON.getJSONObject("!define").put(name,
							new JSONObject(definition));
				} else if (line.startsWith("@special")) {
					String special = line.replaceAll("^[^ ]* ", "");
					String name = special.replaceAll(" .*", "");
					String value = special.replaceAll("^[^ ]* ", "");
					currentObject.put(name, value);
				} else if (currentElement == null) {
					return; // Other annotations are only applicable to existing elements
				} else if (line.startsWith("@param")
						|| line.startsWith("@option")
						|| line.startsWith("@return")
						|| line.startsWith("@link")
						|| line.startsWith("@wiki")
						|| line.startsWith("@url")
						|| line.startsWith("@example")) {
					ItemType type = null;
					if (line.startsWith("@param"))
						type = ItemType.Parameter;
					else if (line.startsWith("@option"))
						type = ItemType.Option;
					else if (line.startsWith("@return"))
						type = ItemType.Return;
					else if (line.startsWith("@link")
							|| line.startsWith("@url"))
						type = ItemType.Link;
					else if (line.startsWith("@wiki"))
						type = ItemType.Wikipedia;
					else if (line.startsWith("@example"))
						type = ItemType.Example;
					String element = line.replaceAll("^[^ ]* ", "");
					String name = element.replaceAll(" .*", "");
					String description = element.replaceAll("^[^ ]* ", "");
					currentElement.addItem(name, description, type);
				} else if (line.startsWith("@effect")) {
					String effect = line.replaceAll("^[^ ]* ", "");
					currentElement.addItem("", effect, ItemType.Effect);
				} else if (line.startsWith("@")) {
					return; // unknown tag
				} else if (inDescription) {
					currentElement.fillDescription(line);
				}
			}
		}
	}

	private void endCurrent() {
		if (currentElement == null)
			return;
		try {
			currentElement.addHelp(currentObject);
		} catch (JSONException e) {
			e.printStackTrace();
		} finally {
			currentElement = null;
		}
	}

	private JSONObject getObjectFromName(String name) throws JSONException {
		String[] split = name.split("\\.");
		JSONObject object = this.helpJSON;
		if (name.equals("root"))
			return object;
		for (int i = 0; i < split.length; i++) {
			String part = split[i];
			JSONObject subObject = object.optJSONObject(part);
			if (subObject == null) {
				JSONObject newObject = new JSONObject();
				object.put(part, newObject);
				object = newObject;
			} else {
				object = subObject;
			}
		}
		return object;
	}

	/**
	 * Returns the help for this script as a JSONObject
	 * 
	 * @return
	 */
	public JSONObject getHelpJSON() {
		return helpJSON;
	}

	public void setHelpJSON(JSONObject helpJSON) {
		this.helpJSON = helpJSON;
	}

	/**
	 * Returns the javascript code processed at this moment.
	 * 
	 * @return
	 */
	public StringBuilder getCodeJS() {
		return codeJS;
	}

	public void setCodeJS(StringBuilder codeJS) {
		this.codeJS = codeJS;
	}

	/*
	 * Following classes are used to create a help element
	 */

	private enum ElementType {
		Function("function"), Object("object"), Constructor("constructor"), Property(
				"property");

		private final String type;

		private ElementType(String type) {
			this.type = type;
		}

		public String getType() {
			return this.type;
		}
	}

	private enum ItemType {
		Parameter("parameters"), Option("options"), Link("links"), Wikipedia(
				"wikipedia"), Effect("!effects"), Return("returns"), Usage(
				"usage"), Example("examples");

		private String name;

		private ItemType(String name) {
			this.name = name;
		}
	}

	private class ElementItem {
		private String name;
		private String value;
		private ItemType type;

		public ElementItem(String name, String value, ItemType type) {
			this.name = name;
			this.value = value;
			this.type = type;
		}

		public ElementItem(String value, ItemType type) {
			this.value = value;
			this.type = type;
		}

		public JSONObject getJson() throws JSONException {
			return new JSONObject().put("name", name).put("value", value);
		}

	}

	private class ElementBuilder {

		private ElementType type;
		private String name;
		private ArrayList<ElementItem> items = new ArrayList<ElementItem>();
		private String shortDescription = "";
		private String longDescription = "";

		public ElementBuilder(String name, ElementType type)
				throws JSONException {
			this.type = type;
			if (type == ElementType.Object) {
				this.name = name.replaceAll(".*\\.", ""); // Remove namespace
			} else if (type == ElementType.Function) {
				String functionName = name;
				if (name.indexOf("(") > -1) {
					functionName = name.replaceAll("\\(.*", "");
				}
				items.add(new ElementItem(name, ItemType.Usage));
				this.name = functionName;
			} else {
				this.name = name;
			}
		}

		public ElementType getType() {
			return this.type;
		}

		public void setType(ElementType type) {
			this.type = type;
		}

		public void addItem(String name, String value, ItemType type) {
			items.add(new ElementItem(name, value, type));
		}

		public void fillDescription(String desc) {
			if (this.shortDescription.length() == 0)
				this.shortDescription = desc;
			else if (this.longDescription.length() == 0)
				this.longDescription = desc;
			else
				this.longDescription = this.longDescription.concat(" " + desc);
		}

		public void addHelp(JSONObject object) throws JSONException {
			JSONObject thisObject;
			if (this.type == ElementType.Object
					|| this.type == ElementType.Constructor) {
				thisObject = object;
			} else {
				thisObject = new JSONObject();
				object.put(this.name, thisObject);
			}

			JSONObject help = new JSONObject();
			help.put("short", shortDescription).put("long", longDescription)
					.put("name", name).put("type", type.getType());

			thisObject.put("!help", help);
			thisObject.put("!doc", shortDescription);

			for (ElementItem item : items) {
				ItemType itemType = item.type;
				String name = itemType.name;
				if (itemType == ItemType.Return)
					help.put(name, item.getJson());
				else if (itemType == ItemType.Usage)
					help.put(name, item.value);
				else if (itemType == ItemType.Effect)
					thisObject.append(name, item.value);
				else
					help.append(name, item.getJson());
			}

			if (this.type == ElementType.Function
					|| this.type == ElementType.Constructor) {
				StringBuilder functionDesc = new StringBuilder("fn(");

				JSONArray parameters = help
						.optJSONArray(ItemType.Parameter.name);
				if (parameters != null) {
					for (int i = 0, ii = parameters.length(); i < ii; i++) {
						functionDesc.append(parameters.getJSONObject(i).getString("name").replaceAll("([:,>)])(.)", "$1 $2"));
						if (i < ii - 1)
							functionDesc.append(", ");
					}
				}
				functionDesc.append(")");

				JSONObject returns = help.optJSONObject(ItemType.Return.name);
				if (returns != null)
					functionDesc.append(" -> " + returns.getString("name"));

				thisObject.put("!type", functionDesc);

			} else if (this.type == ElementType.Property) {
				JSONObject type = help.optJSONObject(ItemType.Return.name);
				if (type != null)
					thisObject.put("!type", type.getString("value"));
			}
		}
	}

	public static void main(String[] args) throws IOException, JSONException {
		BufferedReader input = new BufferedReader(new FileReader(
				"./src/org/cheminfo/function/scripting/array.js"));
		JavaScriptMin javaScriptProcessor = new JavaScriptMin();
		String line = null;
		try {
			while ((line = input.readLine()) != null) {
				javaScriptProcessor.processLine(line);
			}
		} catch (NullPointerException e) {
			System.out.println(line);
		} finally {
			input.close();
		}
		System.out.println(javaScriptProcessor.getHelpJSON().toString(4));
	}
}