package com.EFP.EFP_Video_Dashboard_Backend.controller;

import com.EFP.EFP_Video_Dashboard_Backend.storage.StorageFileNotFoundException;
import com.EFP.EFP_Video_Dashboard_Backend.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.*;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api/v1/storage")
@Slf4j
public class FileUploadController {

    private final StorageService storageService;

    @Autowired
    public FileUploadController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping(value = "/",produces = APPLICATION_JSON_VALUE)
    public List<String> listUploadedFiles(Model model) {


        return storageService.loadAll().map(
                path -> MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                        "serveFile", path.getFileName().toString()).build().toUri().toString()).collect(Collectors.toList());
    }

//    @GetMapping("/files/{filename:.+}")
//    @ResponseBody
//    public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws IOException {
//
//        Resource file = storageService.loadAsResource(filename);
//        ByteArrayResource kk = new ByteArrayResource(file.getInputStream().readAllBytes());
//
//        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
//                "attachment; filename=\"" + file.getFilename() + "\"").contentLength(file.contentLength())
//                .contentType(MediaType.APPLICATION_OCTET_STREAM).body(kk);
//    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename, @RequestHeader HttpHeaders headers) throws Exception {
        val file = storageService.loadAsResource(filename);
        val video = new UrlResource(file.getURI());
        val region = resourceRegion(video, headers);

        System.out.println(file.getURI());

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getFilename() + "\"").contentLength(file.contentLength())
                .contentType(MediaType.APPLICATION_OCTET_STREAM).body(file);
    }


    @PostMapping(value = "/upload", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, String>> handleFileUpload(@RequestParam("file") MultipartFile file,
                                                                RedirectAttributes redirectAttributes) {

        storageService.store(file);

        return ResponseEntity.ok().body(Collections.singletonMap("file", file.getOriginalFilename()));


    }

    @GetMapping("/videos/testimonials/{filename:.+}")
    public ResponseEntity<Resource> getVideo(@PathVariable String filename, @RequestHeader HttpHeaders headers) throws Exception {
        val file = storageService.loadAsResource(filename);
        val video = new UrlResource(file.getURI());
        val region = resourceRegion(video,headers);

        System.out.println(file.getURI());

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getFilename() + "\"").contentLength(file.contentLength())
                .contentType(MediaType.APPLICATION_OCTET_STREAM).body(file);

//        return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT).contentType(MediaTypeFactory.getMediaType(video).orElse(MediaType.APPLICATION_OCTET_STREAM)).body(region);
    }

    private ResourceRegion resourceRegion(UrlResource video , HttpHeaders headers ) throws Exception {
        long contentLength = video.contentLength();
        Optional<HttpRange> range = headers.getRange().stream().findFirst();
        if (range.isPresent()) {
            long start = range.get().getRangeStart(contentLength);
            long end = range.get().getRangeEnd(contentLength);
            long rangeLength = Math.min(1024 * 1024, end - start + 1);
            return new ResourceRegion(video, start, rangeLength);
        } else {
            val rangeLength = Math.min(1024 * 1024, contentLength);
            return new ResourceRegion(video, 0, rangeLength);
        }
    }



    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }

}
