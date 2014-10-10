COMPILER_ZIP = compiler-latest.zip
COMPILER_JAR = compiler.jar
COMPILER_DL_URL = http://dl.google.com/closure-compiler/
BUILD_DIR = build
JAVA = /usr/bin/env java
FAVICON_JS = favicon.js
FAVICON_MIN_JS = favicon.min.js
TEST_HTML = index.html
LICENSE = http://mit-license.org
OUTPUT_WRAPPER = /* $(LICENSE) */ %output%
FLAGS = --js $(FAVICON_JS) --js_output_file $(FAVICON_MIN_JS) --compilation_level ADVANCED_OPTIMIZATIONS --output_wrapper "$(OUTPUT_WRAPPER)"

.PHONY: minify compiler-jar compiler-zip build-dir clean test

minify: $(FAVICON_JS) | compiler-jar
	$(JAVA) -jar ./$(BUILD_DIR)/$(COMPILER_JAR) $(FLAGS)
	@echo "Size: $$(stat --format="%s" $(FAVICON_MIN_JS)) bytes"

compiler-jar: $(BUILD_DIR)/$(COMPILER_JAR)

$(BUILD_DIR)/$(COMPILER_JAR): | compiler-zip
	unzip -qo ./$(BUILD_DIR)/$(COMPILER_ZIP) -d $(BUILD_DIR)

compiler-zip: $(BUILD_DIR)/$(COMPILER_ZIP)

$(BUILD_DIR)/$(COMPILER_ZIP): | build-dir
	curl "$(COMPILER_DL_URL)$(COMPILER_ZIP)" -o ./$(BUILD_DIR)/$(COMPILER_ZIP)

build-dir: $(BUILD_DIR)

$(BUILD_DIR):
	mkdir $(BUILD_DIR)

clean:
	rm -rf ./$(BUILD_DIR)
	rm $(FAVICON_MIN_JS)

test:
	xdg-open $(TEST_HTML)
