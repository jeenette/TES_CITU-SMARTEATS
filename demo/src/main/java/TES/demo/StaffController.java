package TES.demo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from http://localhost:3000
public class StaffController {

    @Autowired
    private StaffService staffService;

    @PostMapping("/postStaff")
    public ResponseEntity<?> postStaff(@Valid @RequestBody Staff staff) {
        System.out.println("Received staff details: " + staff); // Log the received staff details
        System.out.println("Staff name: " + staff.getName()); // Log the staff name
        System.out.println("Staff role: " + staff.getRole()); // Log the staff role
        System.out.println("Staff contact number: " + staff.getContactNumber()); // Log the staff contact number
        System.out.println("Staff schedule: " + staff.getSchedule()); // Log the staff schedule
        try {
            staff.setStaffId(null); // Ensure the ID is null for new entries
            Staff savedStaff = staffService.saveStaff(staff);
            return new ResponseEntity<>(savedStaff, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to create staff member: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/putStaff/{id}")
    public ResponseEntity<?> updateStaff(@PathVariable Long id, @Valid @RequestBody Staff staff) {
        try {
            Optional<Staff> updatedStaff = staffService.updateStaff(id, staff);
            return updatedStaff.map(p -> new ResponseEntity<>(p, HttpStatus.OK))
                               .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to update staff member: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteStaff/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable Long id) {
        try {
            String responseMessage = staffService.deleteStaff(id);
            return new ResponseEntity<>(responseMessage, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to delete staff member: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getStaff")
    public ResponseEntity<?> getAllStaff() {
        try {
            List<Staff> staffList = staffService.getAllStaffs();
            return new ResponseEntity<>(staffList, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to retrieve staff members", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}