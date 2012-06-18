import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Mimic implements MimicInterface{
	private Map map;
	private String output;

	public void createMap(String input) {
		map = new Map();
		String[] words = input.split(" ");
		int length = words.length;
		String key;
		String value;
		for (int i = 0; i < length-1; i++){
			key = words[i]+" "+words[i+1];
			if (i == length-2){
				value = "THE_END"; 
				map.add(key, value);
			} else {
				value = words[i+2];
				map.add(key, value);
			}
		}
	}

	public List<String> getSuffixList(String prefix) {
		if (this.map == null){
			return null;
		}else {
			return map.getValueList(prefix);
		}
	}

	public String generateText() {
		if (this.map == null){
			return null;
		}
		Random random = new Random();
		output = map.getKey(0).split(" ")[0] + " ";
		addToString(map.getKey(0), random);
		return output;
	}
	
	public String addToString(String key, Random random){
		String[] keyPieces = key.split(" ");
		if (keyPieces[1].equals("THE_END")){
			return output;
		}
		ArrayList<String> values = map.getValueList(key);
		String value = values.get(random.nextInt(values.size()));
		output = output + keyPieces[1] + " ";
		String newKey = keyPieces[1] + " " + value;
		return addToString(newKey, random);
	}
	
/*	public static void main(String[] args){
		Mimic my = new Mimic();
		my.createMap("I want to swing I want to boat Boat wants me");
		System.out.println(my.generateText());
		System.out.println(my.getSuffixList("want to"));
	}*/
}
