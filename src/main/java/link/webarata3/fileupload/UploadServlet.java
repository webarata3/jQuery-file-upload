package link.webarata3.fileupload;

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
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

@WebServlet({ "/upload", "/upload/*" })
@MultipartConfig(fileSizeThreshold = 1, maxFileSize = 700 * 1024 * 1024, location = "/Users/arata/Desktop/t")
public class UploadServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    private static final String TEMP_DIR = "/Users/arata/Desktop/o";

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.setCharacterEncoding("utf-8");
        Part part = request.getPart("file");
        String fileName = part.getSubmittedFileName();

        Path outputDir = Paths.get(TEMP_DIR, request.getSession().getId());
        if (!Files.exists(outputDir)) {
            Files.createDirectory(outputDir);
        }
        // ファイルが重複している場合409を返す
        if (Files.exists(outputDir.resolve(fileName))) {
            response.sendError(HttpServletResponse.SC_CONFLICT, "ファイル名が重複しています");
            return;
        }

        Integer currentFileId;
        try (InputStream is = part.getInputStream()) {
            Files.copy(is, outputDir.resolve(fileName));
            // 成功した場合ファイルのIDをセッションに保管する
            HttpSession session = request.getSession();
            synchronized (session) {
                currentFileId = (Integer) session.getAttribute("currentFileId");
                if (currentFileId == null) {
                    currentFileId = 0;
                } else {
                    currentFileId++;
                }
                session.setAttribute("currentFileId", currentFileId);
                session.setAttribute(currentFileId.toString(), fileName);
            }
        }

        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json");

        PrintWriter pw = response.getWriter();
        pw.println("{\"fileId\":\"" + currentFileId + "\"}");
        pw.flush();
        pw.close();
    }

    @Override
    public void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        request.setCharacterEncoding("utf-8");

        String tempFileId = request.getPathInfo();
        if (tempFileId == null || tempFileId.isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        // 先頭の/を取る
        tempFileId = tempFileId.substring(1);
        int fileId;
        try {
            fileId = Integer.parseInt(tempFileId);
        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        HttpSession session = request.getSession();
        String fileName = (String) session.getAttribute(String.valueOf(fileId).toString());
        Path outputDir = Paths.get(TEMP_DIR, request.getSession().getId());
        if (Files.exists(outputDir.resolve(fileName))) {
            Files.delete(outputDir.resolve(fileName));
        }
        // ファイルがなくても気にしない（消そうとしているものがないだけ）
    }
}
