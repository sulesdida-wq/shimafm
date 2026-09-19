<?php
/**
 * ====================================================================
 * SHIMA FM 95.9 — RELAIS AUDIO STREAMING POUR HÉBERGEMENT CPANEL
 * ====================================================================
 * Permet de contourner le blocage Mixed Content des navigateurs (Chrome, Safari, Edge)
 * quand le site web tourne en HTTPS et que le serveur Icecast est en HTTP (port 8000).
 */

// Désactiver la mise en mémoire tampon et limiter le temps d'exécution
@ini_set('zlib.output_compression', 'Off');
@ini_set('output_buffering', 'Off');
@ini_set('implicit_flush', '1');
@ob_implicit_flush(true);
while (@ob_end_clean());

set_time_limit(0);

// En-têtes HTTP requis pour la diffusion audio fluide
header("Content-Type: audio/mpeg");
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("X-Accel-Buffering: no");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// URL du flux direct Icecast de Radio Shima FM
$streamUrl = "http://5.189.189.39:8000/shimafm.mp3";

$opts = [
    'http' => [
        'method' => 'GET',
        'header' => "User-Agent: ShimaFM-cPanel-Player/1.0\r\n" .
                    "Accept: */*\r\n" .
                    "Icy-MetaData: 0\r\n",
        'timeout' => 10,
    ]
];

$context = stream_context_create($opts);
$fp = @fopen($streamUrl, 'rb', false, $context);

if ($fp) {
    while (!feof($fp) && !connection_aborted()) {
        $buffer = fread($fp, 8192);
        if ($buffer === false || strlen($buffer) === 0) {
            break;
        }
        echo $buffer;
        flush();
    }
    fclose($fp);
} else {
    http_response_code(502);
    echo "Flux radio Shima FM momentanément inaccessible.";
}
exit;
