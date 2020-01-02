// (c) 2018 Tim Burke
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.randdusing.bluetoothle;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import java.util.ArrayList;
import java.util.List;
import android.util.Log;
import org.json.JSONArray;
import org.json.JSONObject;

public class SequentialCallbackContext {
    private int sequence;
    private CallbackContext context;

    public SequentialCallbackContext(CallbackContext context) {
        this.context = context;
        this.sequence = 0;
    }

    private int getNextSequenceNumber() {
        synchronized(this) {
            return this.sequence++;
        }
    }

    public CallbackContext getContext() {
        return this.context;
    }

    private void sendResult(PluginResult dataResult) {
      List<PluginResult> resultList = new ArrayList<PluginResult>(2);

      PluginResult sequenceResult = new PluginResult(PluginResult.Status.OK, this.getNextSequenceNumber());

      resultList.add(dataResult);
      resultList.add(sequenceResult);

      PluginResult result = new PluginResult(PluginResult.Status.OK, resultList);

      result.setKeepCallback(true);
      this.context.sendPluginResult(result);
    }

    public void sendSequentialResult(byte data[]) {
        this.sendResult(new PluginResult(PluginResult.Status.OK, data));
    }

    public void sendSequentialResult(int data) {
        this.sendResult(new PluginResult(PluginResult.Status.OK, data));
    }

    public void sendSequentialResult(float data) {
        this.sendResult(new PluginResult(PluginResult.Status.OK, data));
    }

    public void sendSequentialResult(boolean data) {
        this.sendResult(new PluginResult(PluginResult.Status.OK, data));
    }

    public void sendSequentialResult(JSONObject data) {
        this.sendResult(new PluginResult(PluginResult.Status.OK, data));
    }

    public void sendSequentialResult(JSONArray data) {
        this.sendResult(new PluginResult(PluginResult.Status.OK, data));
    }

    public void sendSequentialResult(String data) {
        this.sendResult(new PluginResult(PluginResult.Status.OK, data));
    }
}
