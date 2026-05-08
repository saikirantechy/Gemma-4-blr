/*
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// MD5 implementation (simple for demo)
function md5(str) {
  let hash = 0;
  if (str.length === 0) return hash.toString(16);
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, "0");
}

async function digestMessage(message, algorithm = "sha1") {
  const msgUint8 = new TextEncoder().encode(message);

  let hashAlgorithm;
  switch (algorithm.toLowerCase()) {
    case "sha256":
      hashAlgorithm = "SHA-256";
      break;
    case "sha1":
      hashAlgorithm = "SHA-1";
      break;
    case "md5":
      return { result: md5(message) };
    default:
      hashAlgorithm = "SHA-1";
  }

  const hashBuffer = await crypto.subtle.digest(hashAlgorithm, msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return { result: hashHex };
}

window["ai_edge_gallery_get_result"] = async (data) => {
  try {
    const jsonData = JSON.parse(data);
    const algorithm = jsonData["algorithm"] || "sha1";
    return JSON.stringify(await digestMessage(jsonData["text"], algorithm));
  } catch (e) {
    console.error(e);
    return JSON.stringify({ error: `Failed to calculate hash: ${e.message}` });
  }
};
