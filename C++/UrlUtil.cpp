/*
NOTE TO SELF:
char * temp_url = url.c_str() DOES NOT WORK
Must use:
char temp_url[1024];
strcpy(temp_url, url.c_str());
char * c_url = new char[strlen(temp_url) + 1];
strcpy(c_url, temp_url);
To get c_url to be what I want.

*/
#include "UrlUtil.h"

//sets base_url equal to url
UrlUtil::UrlUtil(string & url){
	char temp_url[1024];
	strcpy(temp_url, url.c_str());
	char * c_url = new char[strlen(temp_url) + 1];
	strcpy(c_url, temp_url);
	int index = indexOf('/', c_url, -1);
	int indexfirst = indexOf('/', c_url, 1);
	string new_url = (StringUtil::ToLowerCopy(url.substr(0, indexfirst)) +
			url.substr(indexfirst)).substr(0, index+1);
	base_url = new_url;
	delete[] c_url;
}

void UrlUtil::set_resolve_url(string & url){
	char temp_url[1024];
	strcpy(temp_url, url.c_str());
	char * c_url = new char[strlen(temp_url) + 1];
	strcpy(c_url, temp_url);
	int index = indexOf('/', c_url, -1);
	int indexfirst = indexOf('/', c_url, 1);
	string new_url = (StringUtil::ToLowerCopy(url.substr(0, indexfirst)) +
			url.substr(indexfirst)).substr(0, index+1);
	resolve_url = new_url;
	delete[] c_url;
}

UrlUtil::~UrlUtil(){
	//delete &base_url;
}

//interprets given url.  First checks if URL is valid html url.
//If url is absolute, checks to see if it's in scope.  If url is relative, resolves it.
//If it is a valid url overall (html, in scope), returns the full url.  If not, returns NULL.
string UrlUtil::get_url(string & s){
	if (s.substr(0,1).compare("#") == 0) return "none";
	if (is_relative(s)){
		s = resolve(s);
	}
	//cout << s << endl;
	int hash = s.find('#');
	if (hash != string::npos){
		s = s.substr(0, hash);
	}

	char temp_url[1024];
	strcpy(temp_url, s.c_str());
	char c_url[strlen(temp_url) + 1];
	strcpy(c_url, temp_url);
	int indexfirst = indexOf('/', c_url, 1);
	if (indexfirst != -1) s = StringUtil::ToLowerCopy(s.substr(0, indexfirst)) + s.substr(indexfirst);

	if (is_in_scope(s) && is_html(s)){
		string toReturn(s);
		return toReturn;
	}
	return "none";
}

//checks to see if the given url is relative or absolute, based on the beginning of the url
bool UrlUtil::is_relative(string & url){
	//cout << "Inside is_relative" << endl;
	//cout << url << endl;
	string sub = url.substr(0, 4);
	//cout << sub << endl;
	//cout << sub.compare("http");
	return (sub.compare("http") != 0 && sub.compare("file") != 0);
}

//checks to see if the given absolute url is in scope, based on base_url
bool UrlUtil::is_in_scope(string & url){
	return ((url.substr(0, base_url.length())).compare(base_url) == 0);
}

//checks to make sure that the url is a valid html url.
bool UrlUtil::is_html(string & url){
	string temp = url;
	int quest = url.find('?');
	if (quest != string::npos){
		temp = url.substr(0, quest);
	}
	char temp_char[1024];
	strcpy(temp_char, temp.c_str());
	char c_url[strlen(temp_char) + 1];
	strcpy(c_url, temp_char);

	int index = indexOf('/', c_url, -1);
	string end = temp.substr(index);
	//cout << end << endl;

	if(end.compare("/") == 0) return false;
	int period = end.find('.');
	if (period == string::npos) return true;
	string extension = end.substr(period + 1);

	return (extension.compare("html") == 0 || extension.compare("htm") == 0
			|| extension.compare("shtml") == 0 || extension.compare("cgi") == 0
			|| extension.compare("jsp") == 0 || extension.compare("asp") == 0
			|| extension.compare("aspx") == 0  || extension.compare("php") == 0
			|| extension.compare("pl") == 0 || extension.compare("cfm") == 0);
}

//determines how many levels up you need to go to appropriately resolve the url.
int UrlUtil::howFarBack(char * s){
	int toReturn = 0;
	s++;
	int half = 1;
	while(1){
		switch(*s){
		case '.':
			if (half == 1){
				half = 0;
				toReturn++;
			} else{
				half = 1;
			}
			break;
		case '/':
			half = 0;
			break;
		default:
			return toReturn;
		}
		s++;
	}
	return -1;
}

//gets the index of the given character in the cstring.  Skips the first two /'s.
//For the type Parameter, if passed a 1 starts at
//the beginning of the string, if given a -1 starts at the end of the string.
int UrlUtil::indexOf(char c, char * s, int type){
	char * cpy = s;
	int skip = 2;
	if (type == 1){
		for (int i = 0; i < strlen(s); i++){
			if (*cpy == c){
				if (skip < 1){
					return i;
				} else{
					skip--;
				}
			}
			cpy++;

		}
		return -1;
	} else{
		int index = -1;
		for (int i = 0; i < strlen(s); i++){
			if (*cpy == c){
				if (skip == 0){
					index = i;
				} else{
					skip--;
				}
			}
			cpy++;
		}
		return index;
	}
}

//after determining how many levels up to go to resolve the url,
//strips all .'s and /'s from the beginning of the url.
char * UrlUtil::trim(char * s){
	char * toReturn = new char[strlen(s) + 1];
	while(1){
		if (*s != '.' && *s != '/'){
			strcpy(toReturn, s);
			return toReturn;
		}
		s++;
	}
	delete toReturn;
	return NULL;
}

//resolves the given rel_url to the given resolve url.
string UrlUtil::resolve(const string & string_rel_url){
	char temp[1024];
	strcpy(temp, resolve_url.c_str());
	char c_base_url[strlen(temp) + 1];
	strcpy(c_base_url, temp);
	char temp2[1024];
	strcpy(temp2, string_rel_url.c_str());
	char rel_url[strlen(temp2) + 1];
	strcpy(rel_url, temp2);

	//cout << c_base_url << endl;
//	cout << rel_url << endl;

	char first = *rel_url;
	char resolved[strlen(c_base_url) + strlen(rel_url) + 1];
	memset(resolved, 0, sizeof(resolved));

	//cout << resolved << endl;
	//cout << first << endl;

	switch(first){
		case '/':{
			int index = indexOf('/', c_base_url, 1);
			if (index == -1){
				strcpy(resolved, c_base_url);
			} else{
				//cout << c_base_url << endl;
				//cout << resolved << endl;
				//cout << index << endl;
				//cout << strlen(c_base_url) << endl;
				strncpy(resolved, c_base_url, index);
				//cout << resolved << endl;
			}
			strcat(resolved, rel_url);
			break;
		}
		case '.':{
			//cout << "here" << endl;
			int back = howFarBack(rel_url);
			//cout << back << endl;
			for (int i = 0 ; i <= back; i++){
				int index = indexOf('/', c_base_url, -1);
				c_base_url[index] = '\0';
			}
			strcpy(resolved, c_base_url);
			strcat(resolved, "/");
			char * trimmed = trim(rel_url);
			strcat(resolved, trimmed);
			delete[] trimmed;
			break;
		}
		case '#':
			strcpy(resolved, c_base_url);
			strcat(resolved, rel_url);
			break;
		default:{
			strcpy(resolved, c_base_url);
			strcat(resolved, rel_url);
			break;
		}
	}

	return string(resolved);
}

void UrlUtil::test(){
	cout << "UrlUtil: " << endl;

	string base = "http://www.scope.com/inscope/start.htm";
	UrlUtil util(base);
	util.set_resolve_url(base);
	assert(util.base_url.compare("http://www.scope.com/inscope/") == 0);
	cout << "\tPassed Constructor" << endl;

	string url = "#scores";
	assert((util.get_url(url)).compare("none") == 0);
	cout << "\tPassed hashtag" << endl;

	url = "http://www.scope.com/inscope/scopes/inscope.asp";
	assert(util.get_url(url).compare(url) == 0);
	cout << "\tPassed Absolute" << endl;

	url = "./oranges/apples.php";
	//cout << util.get_url(url) << endl;
	assert(util.get_url(url).compare("http://www.scope.com/inscope/oranges/apples.php") == 0);
	url = "oranges/apples.php";
	assert(util.get_url(url).compare("http://www.scope.com/inscope/oranges/apples.php") == 0);
	cout << "\tPassed relative" << endl;

	url = "/oranges/apples.php";
	assert(util.get_url(url).compare("none") == 0);
	url = "../oranges/apples.php";
	assert(util.get_url(url).compare("none") == 0);
	url = "http://www.scope.com/outofscope/start.htm";
	assert(util.get_url(url).compare("none") == 0);
	cout << "\tPassed out of scope" << endl;

	url = "./oranges/apples.js";
	assert(util.get_url(url).compare("none") == 0);
	url = "green";
	assert(util.get_url(url).compare("http://www.scope.com/inscope/green") == 0);
	url = "purple.html";
	assert(util.get_url(url).compare("http://www.scope.com/inscope/purple.html") == 0);
	cout << "\tPassed is_html" << endl;

	url = "orange.php?one=1&two=2";
	assert(util.get_url(url).compare("http://www.scope.com/inscope/orange.php?one=1&two=2") == 0);
	cout << "\tPassed with Queries" << endl;
}
