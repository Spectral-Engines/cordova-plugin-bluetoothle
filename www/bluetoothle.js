function SlidingWindowReorderer (callback, operation) {
    console.log("BLEJS: SlidingWindowReorderer created for " + operation);
    this.operation = operation;
    this.callback = callback;
    this.onHold = {};
    this.nextExpected = 0;
}

SlidingWindowReorderer.prototype.receiveValue = function(value, sequence) {
    if (sequence === undefined) {
        console.log("BLEJS: Sequence not defined for operation " + this.operation);
    }

    console.log("BLEJS: SlidingWindowReorderer.receiveValue called with sequence " + sequence + " for " + this.operation);
    console.log("BLEJS: receiveValue.value: " + JSON.stringify(value));
    /**
     * If there is not a sequence number present, just pass the callback through
     * without reordering it.
     */
    if (sequence == null) {
        this.callback(value);
        return;
    }

    if (sequence != this.nextExpected) {
        console.warn(`BLEJS: Received out of order: expected ${this.nextExpected} got ${sequence}. (${this.operation})`);
    }

    this.onHold[sequence] = value;

    this.tryDispatchInOrder();
}

SlidingWindowReorderer.prototype.tryDispatchInOrder = function() {
    while (this.nextExpected in this.onHold) {
        try {
            let value = this.onHold[this.nextExpected];
            delete this.onHold[this.nextExpected];

            this.nextExpected += 1;

            this.callback(value);
        } catch (error) {
            console.error("Error in callback in SlidingWindowReorderer", error);
        }
    }
};

function cordovaExec(operation, successCallback, errorCallback, params) {
  var slidingWindowReorderer = new SlidingWindowReorderer(successCallback, operation);

  // We expect that there are even number of invocations of the success callback of cordova.exec,
  // where the first returnValue is the value and the second returnValue is the sequence number
  let isSequenceNumber = false;
  let value;

  cordova.exec(function(returnValue) {
    // TODO: Figure out why we only receive the first value of the multipart PluginResult
    if (!isSequenceNumber) {
        value = returnValue;
    } else {
        slidingWindowReorderer.receiveValue(value, returnValue);
    }

    isSequenceNumber = !isSequenceNumber;

  }, errorCallback, bluetoothleName, operation, params);
}

var bluetoothleName = "BluetoothLePlugin";
var bluetoothle = {
  initialize: function(successCallback, params) {
    cordovaExec("initialize", successCallback, /* successCallback */ function (x) {
        console.log("BLEJS: Error in initialize:");
        console.error(x);
    }, [params]);
  },
  enable: function(successCallback, errorCallback) {
    cordovaExec("enable", successCallback, errorCallback, []);
  },
  disable: function(successCallback, errorCallback) {
    cordovaExec("disable", successCallback, errorCallback, []);
  },
  getAdapterInfo: function(successCallback) {
    cordovaExec("getAdapterInfo", successCallback, successCallback, []);
  },
  startScan: function(successCallback, errorCallback, params) {
    cordovaExec("startScan", successCallback, errorCallback, [params]);
  },
  stopScan: function(successCallback, errorCallback) {
    cordovaExec("stopScan", successCallback, errorCallback, []);
  },
  retrieveConnected: function(successCallback, errorCallback, params) {
    cordovaExec("retrieveConnected", successCallback, errorCallback, [params]);
  },
  bond: function(successCallback, errorCallback, params) {
    cordovaExec("bond", successCallback, errorCallback, [params]);
  },
  unbond: function(successCallback, errorCallback, params) {
    cordovaExec("unbond", successCallback, errorCallback, [params]);
  },
  connect: function(successCallback, errorCallback, params) {
    cordovaExec("connect", successCallback, errorCallback, [params]);
  },
  reconnect: function(successCallback, errorCallback, params) {
    cordovaExec("reconnect", successCallback, errorCallback, [params]);
  },
  disconnect: function(successCallback, errorCallback, params) {
    cordovaExec("disconnect", successCallback, errorCallback, [params]);
  },
  close: function(successCallback, errorCallback, params) {
    cordovaExec("close", successCallback, errorCallback, [params]);
  },
  discover: function(successCallback, errorCallback, params) {
    cordovaExec("discover", successCallback, errorCallback, [params]);
  },
  services: function(successCallback, errorCallback, params) {
    cordovaExec("services", successCallback, errorCallback, [params]);
  },
  characteristics: function(successCallback, errorCallback, params) {
    cordovaExec("characteristics", successCallback, errorCallback, [params]);
  },
  descriptors: function(successCallback, errorCallback, params) {
    cordovaExec("descriptors", successCallback, errorCallback, [params]);
  },
  read: function(successCallback, errorCallback, params) {
    cordovaExec("read", successCallback, errorCallback, [params]);
  },
  subscribe: function(successCallback, errorCallback, params) {
    console.log("BLEJS: subscribe called");
    cordovaExec("subscribe", successCallback, errorCallback, [params]);
  },
  unsubscribe: function(successCallback, errorCallback, params) {
    cordovaExec("unsubscribe", successCallback, errorCallback, [params]);
  },
  write: function(successCallback, errorCallback, params) {
    cordovaExec("write", successCallback, errorCallback, [params]);
  },
  writeQ: function(successCallback, errorCallback, params) {
    cordovaExec("writeQ", successCallback, errorCallback, [params]);
  },
  readDescriptor: function(successCallback, errorCallback, params) {
    cordovaExec("readDescriptor", successCallback, errorCallback, [params]);
  },
  writeDescriptor: function(successCallback, errorCallback, params) {
    cordovaExec("writeDescriptor", successCallback, errorCallback, [params]);
  },
  rssi: function(successCallback, errorCallback, params) {
    cordovaExec("rssi", successCallback, errorCallback, [params]);
  },
  mtu: function(successCallback, errorCallback, params) {
    cordovaExec("mtu", successCallback, errorCallback, [params]);
  },
  requestConnectionPriority: function(successCallback, errorCallback, params) {
    cordovaExec("requestConnectionPriority", successCallback, errorCallback, [params]);
  },
  isInitialized: function(successCallback) {
    cordovaExec("isInitialized", successCallback, successCallback, []);
  },
  isEnabled: function(successCallback) {
    cordovaExec("isEnabled", successCallback, successCallback, []);
  },
  isScanning: function(successCallback) {
    cordovaExec("isScanning", successCallback, successCallback, []);
  },
  isBonded: function(successCallback, errorCallback, params) {
    cordovaExec("isBonded", successCallback, errorCallback, [params]);
  },
  wasConnected: function(successCallback, errorCallback, params) {
    cordovaExec("wasConnected", successCallback, errorCallback, [params]);
  },
  isConnected: function(successCallback, errorCallback, params) {
    cordovaExec("isConnected", successCallback, errorCallback, [params]);
  },
  isDiscovered: function(successCallback, errorCallback, params) {
    cordovaExec("isDiscovered", successCallback, errorCallback, [params]);
  },
  hasPermission: function(successCallback, errorCallback) {
    cordovaExec("hasPermission", successCallback, errorCallback, []);
  },
  requestPermission: function(successCallback, errorCallback) {
    cordovaExec("requestPermission", successCallback, errorCallback, []);
  },
  isLocationEnabled: function(successCallback, errorCallback) {
    cordovaExec("isLocationEnabled", successCallback, errorCallback, []);
  },
  requestLocation: function(successCallback, errorCallback) {
    cordovaExec("requestLocation", successCallback, errorCallback, []);
  },
  initializePeripheral: function(successCallback, errorCallback, params) {
    cordovaExec("initializePeripheral", successCallback, errorCallback, [params]);
  },
  addService: function(successCallback, errorCallback, params) {
    cordovaExec("addService", successCallback, errorCallback, [params]);
  },
  removeService: function(successCallback, errorCallback, params) {
    cordovaExec("removeService", successCallback, errorCallback, [params]);
  },
  removeAllServices: function(successCallback, errorCallback, params) {
    cordovaExec("removeAllServices", successCallback, errorCallback, [params]);
  },
  startAdvertising: function(successCallback, errorCallback, params) {
    cordovaExec("startAdvertising", successCallback, errorCallback, [params]);
  },
  stopAdvertising: function(successCallback, errorCallback, params) {
    cordovaExec("stopAdvertising", successCallback, errorCallback, [params]);
  },
  isAdvertising: function(successCallback, errorCallback, params) {
    cordovaExec("isAdvertising", successCallback, errorCallback, []);
  },
  respond: function(successCallback, errorCallback, params) {
    cordovaExec("respond", successCallback, errorCallback, [params]);
  },
  notify: function(successCallback, errorCallback, params) {
    cordovaExec("notify", successCallback, errorCallback, [params]);
  },
  encodedStringToBytes: function(string) {
    var data = atob(string);
    var bytes = new Uint8Array(data.length);
    for (var i = 0; i < bytes.length; i++)
    {
      bytes[i] = data.charCodeAt(i);
    }
    return bytes;
  },
  bytesToEncodedString: function(bytes) {
    return btoa(String.fromCharCode.apply(null, bytes));
  },
  stringToBytes: function(string) {
    var bytes = new ArrayBuffer(string.length * 2);
    var bytesUint16 = new Uint16Array(bytes);
    for (var i = 0; i < string.length; i++) {
      bytesUint16[i] = string.charCodeAt(i);
    }
    return new Uint8Array(bytesUint16);
  },
  bytesToString: function(bytes) {
    return String.fromCharCode.apply(null, new Uint16Array(bytes));
  },
  bytesToHex: function(bytes) {
    var string = [];
    for (var i = 0; i < bytes.length; i++) {
      string.push("0x" + ("0"+(bytes[i].toString(16))).substr(-2).toUpperCase());
    }
    return string.join(" ");
  },
  SCAN_MODE_OPPORTUNISTIC: -1,
  SCAN_MODE_LOW_POWER: 0,
  SCAN_MODE_BALANCED: 1,
  SCAN_MODE_LOW_LATENCY: 2,
  MATCH_NUM_ONE_ADVERTISEMENT: 1,
  MATCH_NUM_FEW_ADVERTISEMENT: 2,
  MATCH_NUM_MAX_ADVERTISEMENT: 3,
  MATCH_MODE_AGGRESSIVE: 1,
  MATCH_MODE_STICKY: 2,
  CALLBACK_TYPE_ALL_MATCHES: 1,
  CALLBACK_TYPE_FIRST_MATCH: 2,
  CALLBACK_TYPE_MATCH_LOST: 4,
}
module.exports = bluetoothle;
