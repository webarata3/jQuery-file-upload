package link.arata.fileupload;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@WebServlet(name = "Upload", urlPatterns = { "/upload" })
@MultipartConfig(fileSizeThreshold = 5000000, maxFileSize = 700 * 1024 * 1024, location = "/Users/arata/Desktop")
public class UploadServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.setCharacterEncoding("utf-8");
        Part part = request.getPart("file");
        String name = getFilename(part);
        part.write(name);

        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json");

        PrintWriter pw = response.getWriter();
        pw.println("{\"result\":\"ok\"}");
        pw.flush();
        pw.close();
    }

    private String getFilename(Part part) {
        for (String cd : part.getHeader("Content-Disposition").split(";")) {
            if (cd.trim().startsWith("filename")) {
                return cd.substring(cd.indexOf('=') + 1).trim().replace("\"", "");
            }
        }

        return null;
    }
}
