/**
 * Copyright 2018 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require('express');
const bodyparser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 9000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.post('/',function(req, res){
  var text = '';
  
  //Case 1: When BOT was added to the ROOM
  if(req.body.type == 'ADDED_TO_SPACE' && req.body.space.type == 'ROOM') {
      text = `Thanks for adding me to ${req.body.user.displayName}`;
  }
  //Case 2: When BOT was added to a DM
  else if(req.body.type == 'ADDED_TO_SPACE' && req.body.space.type == 'DM') {
      text = `Thanks for adding me to a DM , ${req.body.user.displayName}`;
  }
  //Case 3: Texting the BOT
  else if(req.body.type == 'MESSAGE') {
      text = `Your message : ${req.body.message.text}`;
  }

  return res.json({'text': text});
});

app.listen(PORT, function () {
  console.log(`Server is running in port - ${PORT}`);
});
