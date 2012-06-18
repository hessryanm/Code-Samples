import java.util.ArrayList;

public class Map {
	private ArrayList<String> keys;
	private ArrayList<ArrayList<String>> values;
	
	public Map (){
		keys = new ArrayList<String>();
		values = new ArrayList<ArrayList<String>>();
	}

	public void add(String key, String value){
		if (keys.indexOf(key) == -1){
			keys.add(key);
			ArrayList<String> temp = new ArrayList<String>();
			temp.add(value);
			values.add(temp);
		} else {
			int index = keys.indexOf(key);
			ArrayList<String> temp = values.get(index);
			temp.add(value);
			values.set(index, temp);
		}
	}
	
	public ArrayList<String> getValueList(String key){
		if (keys.indexOf(key) != -1){
			return values.get(keys.indexOf(key));
		} else {
			return null;
		}
	}
	
	public String getKey(int index){
		return keys.get(index);
	}
}
