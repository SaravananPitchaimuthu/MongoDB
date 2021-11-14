import logging


class AppLogger:
    def __init__(self,complete_log_file,unique_id):
        self.complete_log_file = complete_log_file
        self.unique_id = unique_id
        self.clogger = None
    
    def set_logger(self):
        try:
            self.clogger = logging.getLogger(self.unique_id)
            self.clogger.setLevel(logging.DEBUG)

            loghandler = logging.FileHandler(self.complete_log_file)

            formatter = logging.Formatter(
                "\n ########## [%(asctime)s] %(levelname)s %(module)s %(processName)s %(threadName)s : [%(name)s.%(funcName)s:%(lineno)d] ########## \n\n %(message)s\n")
            
            self.clogger.addHandler(loghandler)
            loghandler.setFormatter(formatter)

            return self.clogger
        
        except Exception as exp:
            raise f"Failure in instantiating Logger with error: {repr(exp)}"