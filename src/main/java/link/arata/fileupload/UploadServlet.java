package link.arata.fileupload;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@WebServlet("/upload")
@MultipartConfig(fileSizeThreshold = 1, maxFileSize = 700 * 1024 * 1024, location = "/Users/arata/Desktop/t")
public class UploadServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    private static final String TEMP_DIR = "/Users/arata/Desktop/o";

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.setCharacterEncoding("utf-8");
        Part part = request.getPart("file");
        String name = part.getSubmittedFileName();

        Path outputDir = Paths.get(TEMP_DIR, request.getSession().getId());
        if (!Files.exists(outputDir)) {
            Files.createDirectory(outputDir);
        }
        // ファイルが重複している場合409を返す
        if (Files.exists(outputDir.resolve(name))) {
            response.sendError(HttpServletResponse.SC_CONFLICT, "ファイル名が重複しています");
            return;
        }

        try (InputStream is = part.getInputStream()) {
            Files.copy(is, outputDir.resolve(name));
        }

        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json");

        PrintWriter pw = response.getWriter();
        pw.println("{\"result\":\"ok\"}");
        pw.flush();
        pw.close();
    }
}
