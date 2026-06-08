/*:
 * @plugindesc Adds a Disable Screen Stretch option that reloads the game and controls Ten plugins.
 * @author You
 */

(function() {

    ConfigManager.stretchOff = false;

    const _makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _makeData.call(this);
        config.stretchOff = this.stretchOff;
        return config;
    };

    const _applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _applyData.call(this, config);

        if (config.stretchOff !== undefined) {
            this.stretchOff = !!config.stretchOff;
        } else {
            this.stretchOff =
                localStorage.getItem("stretchOff") === "true";
        }

        localStorage.setItem(
            "stretchOff",
            this.stretchOff ? "true" : "false"
        );
    };

    const _addGeneralOptions =
        Window_Options.prototype.addGeneralOptions;

    Window_Options.prototype.addGeneralOptions = function() {
        _addGeneralOptions.call(this);
        this.addCommand(
            "Disable Screen Stretch",
            "stretchOff"
        );
    };

    const _changeValue =
        Window_Options.prototype.changeValue;

    Window_Options.prototype.changeValue = function(symbol, value) {
        const oldValue = this.getConfigValue(symbol);

        _changeValue.call(this, symbol, value);

        if (
            symbol === "stretchOff" &&
            oldValue !== value
        ) {
            localStorage.setItem(
                "stretchOff",
                value ? "true" : "false"
            );

            ConfigManager.save();

            setTimeout(function() {
                location.reload();
            }, 50);
        }
    };

})();
